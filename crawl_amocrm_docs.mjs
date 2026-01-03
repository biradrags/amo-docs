import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { URL } from "node:url";

import cheerio from "cheerio";
import TurndownService from "turndown";

const SECTIONS = [
  "https://www.amocrm.ru/developers/content/crm_platform/platform-abilities",
  "https://www.amocrm.ru/developers/content/oauth/oauth",
  "https://www.amocrm.ru/developers/content/integrations/release-spring-2022",
  "https://www.amocrm.ru/developers/content/digital_pipeline/webhooks",
  "https://www.amocrm.ru/developers/content/catalogs/capabilities",
  "https://www.amocrm.ru/developers/content/telephony/capabilities-2",
  "https://www.amocrm.ru/developers/content/chats/chat-capabilities",
  "https://www.amocrm.ru/developers/content/files/files-capabilities",
  "https://www.amocrm.ru/developers/content/notifications/center_capabilities",
  "https://www.amocrm.ru/developers/content/web_sdk/start"
];

const OUT_BASE = path.resolve(process.cwd(), "amocrm_docs_md");

const USER_AGENT =
  "amocrm-docs-crawler/1.0 (+https://www.amocrm.ru/developers/content/crm_platform/platform-abilities)";

function buildSectionRoot(url) {
  if (!url.endsWith("/")) {
    const idx = url.lastIndexOf("/");
    url = idx === -1 ? `${url}/` : `${url.slice(0, idx + 1)}`;
  }
  return url;
}

const SECTION_ROOTS = new Map(SECTIONS.map((u) => [buildSectionRoot(u), u]));

function normalizeUrl(baseUrl, href, sectionRoot) {
  if (!href) return null;
  const withoutHash = href.split("#", 1)[0];
  if (!withoutHash) return null;
  let url;
  try {
    url = new URL(withoutHash, baseUrl).toString();
  } catch {
    return null;
  }
  if (!url.startsWith(sectionRoot)) return null;
  return url;
}

function sectionNameFromRoot(sectionRoot) {
  const trimmed = sectionRoot.replace(/\/+$/, "");
  const parts = trimmed.split("/");
  return parts[parts.length - 1] || "section";
}

function urlToFilename(sectionDir, sectionRoot, url) {
  const parsed = new URL(url);
  let rel = parsed.pathname;
  const rootParsed = new URL(sectionRoot);
  const rootPath = rootParsed.pathname;
  if (rel.startsWith(rootPath)) {
    rel = rel.slice(rootPath.length);
  }
  rel = rel.replace(/^\/+|\/+$/g, "");
  if (!rel) rel = "index";
  const safe = rel.replace(/\//g, "_");
  return path.join(sectionDir, `${safe}.md`);
}

function extractMainContent($) {
  const selectors = [
    "div.content-block__inner",
    "div.content-block__text",
    "main.page_main",
    "div.page_wrapper.developers",
    "div.developers-content",
    "div.developers-article",
    "div.content__inner",
    "div.layout__content",
    "main"
  ];

  for (const selector of selectors) {
    const found = $(selector).first();
    if (found.length) return found;
  }

  const body = $("body").first();
  return body.length ? body : $.root();
}

function stripLayoutElements($, root) {
  const selectors = [
    "header",
    "footer",
    "nav",
    "aside",
    "div.header",
    "div.footer",
    "div.nav",
    "div.sidebar",
    "div.breadcrumbs",
    "ul.breadcrumbs"
  ];

  for (const selector of selectors) {
    root.find(selector).remove();
    if (root.is(selector)) root.remove();
  }
}

async function fetchHtml(url) {
  const resp = await fetch(url, {
    headers: {
      "User-Agent": USER_AGENT
    },
    redirect: "follow"
  });
  if (!resp.ok) {
    throw new Error(`HTTP ${resp.status} for ${url}`);
  }
  return await resp.text();
}

const turndown = new TurndownService({
  headingStyle: "atx"
});

function htmlToMarkdown(url, html) {
  const $ = cheerio.load(html);
  const main = extractMainContent($);
  stripLayoutElements($, main);
  const innerHtml = main.html() ?? "";
  const markdownBody = turndown.turndown(innerHtml);
  return `# ${url}\n\n${markdownBody}`;
}

function extractLinks(html, baseUrl, sectionRoot) {
  const $ = cheerio.load(html);
  const links = [];
  $("a").each((_, a) => {
    const href = $(a).attr("href") || null;
    const norm = normalizeUrl(baseUrl, href, sectionRoot);
    if (norm && !links.includes(norm)) {
      links.push(norm);
    }
  });
  return links;
}

async function crawlSection(sectionRoot, startUrl, maxPages = 200) {
  const name = sectionNameFromRoot(sectionRoot);
  const sectionDir = path.join(OUT_BASE, name);
  await fs.mkdir(sectionDir, { recursive: true });

  const queue = [startUrl];
  const visited = new Set();

  while (queue.length && visited.size < maxPages) {
    const url = queue.shift();
    if (!url || visited.has(url)) continue;
    visited.add(url);

    // eslint-disable-next-line no-console
    console.log(`[${name}] fetch ${url}`);

    let html;
    try {
      html = await fetchHtml(url);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(`[${name}] error fetching ${url}:`, e);
      continue;
    }

    let markdown;
    try {
      markdown = htmlToMarkdown(url, html);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(
        `[${name}] error converting ${url} to markdown:`,
        e
      );
      continue;
    }

    const outFile = urlToFilename(sectionDir, sectionRoot, url);
    try {
      await fs.writeFile(outFile, markdown, "utf8");
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(`[${name}] error writing ${outFile}:`, e);
    }

    let newLinks = [];
    try {
      newLinks = extractLinks(html, url, sectionRoot);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(
        `[${name}] error extracting links from ${url}:`,
        e
      );
    }

    for (const link of newLinks) {
      if (!visited.has(link) && !queue.includes(link)) {
        queue.push(link);
      }
    }
  }

  // eslint-disable-next-line no-console
  console.log(
    `[${name}] done, saved ${visited.size} pages to ${sectionDir}`
  );
}

async function main() {
  await fs.mkdir(OUT_BASE, { recursive: true });
  for (const [sectionRoot, startUrl] of SECTION_ROOTS.entries()) {
    // eslint-disable-next-line no-await-in-loop
    await crawlSection(sectionRoot, startUrl, 300);
  }
}

const thisFile = fileURLToPath(import.meta.url);
if (process.argv[1] && path.resolve(process.argv[1]) === thisFile) {
  // eslint-disable-next-line no-console
  main().catch((e) => {
    console.error(e);
    process.exitCode = 1;
  });
}


