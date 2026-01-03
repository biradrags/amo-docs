import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { URL } from "node:url";

import axios from "axios";
import * as cheerio from "cheerio";
import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";

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

const BASE_URL = "https://www.amocrm.ru/developers/content/";
const OUT_BASE = path.resolve(process.cwd(), "amocrm_docs_md");

const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

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

function urlToMarkdownPath(url) {
  if (!url.startsWith(BASE_URL)) return null;
  const rel = url.slice(BASE_URL.length).replace(/\/+$/, "");
  if (!rel) return null;
  return rel;
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
    "ul.breadcrumbs",
    "script",
    "style",
    "noscript",
    ".button",
    ".btn"
  ];

  for (const selector of selectors) {
    root.find(selector).remove();
  }
}

function convertInternalLinks($, baseUrl) {
  $("a").each((_, a) => {
    const $a = $(a);
    const href = $a.attr("href");
    if (!href) return;
    
    let absUrl;
    try {
      absUrl = new URL(href, baseUrl).toString();
    } catch {
      return;
    }

    if (absUrl.startsWith(BASE_URL)) {
      const targetPath = urlToMarkdownPath(absUrl);
      if (targetPath) {
        $a.attr("href", `/${targetPath}.html`);
      }
    }
  });
}

async function fetchHtml(url) {
  const resp = await axios.get(url, {
    headers: {
      "User-Agent": USER_AGENT
    },
    maxRedirects: 5,
    timeout: 30000
  });
  return resp.data;
}

function setupTurndown() {
  const turndown = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
    fence: "```",
    bulletListMarker: "*"
  });
  
  turndown.use(gfm);
  
  turndown.addRule("preserveCodeBlocks", {
    filter: function (node) {
      return node.nodeName === "PRE" && node.querySelector("code");
    },
    replacement: function (content, node) {
      const codeNode = node.querySelector("code");
      const lang = codeNode ? (codeNode.className.match(/language-(\w+)/) || ["", ""])[1] : "";
      const code = codeNode ? codeNode.textContent : content;
      return "\n\n```" + lang + "\n" + code.trim() + "\n```\n\n";
    }
  });

  turndown.addRule("inlineCode", {
    filter: function (node) {
      return node.nodeName === "CODE" && node.parentNode.nodeName !== "PRE";
    },
    replacement: function (content) {
      return "`" + content + "`";
    }
  });

  return turndown;
}

function cleanMarkdown(markdown) {
  const lines = markdown.split("\n");
  const result = [];
  let inCodeBlock = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (line.trim().startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      result.push(line);
      continue;
    }
    
    if (inCodeBlock) {
      result.push(line);
      continue;
    }
    
    if (i === 0 && !line.startsWith("#") && line.trim() && lines[i + 1] === "") {
      result.push(`# ${line.trim()}`);
      continue;
    }
    
    result.push(line);
  }
  
  let cleanedMarkdown = result.join("\n");
  
  cleanedMarkdown = cleanedMarkdown.replace(/<a\s+href="([^"]*\([^)]*\)[^"]*)"/g, (match, url) => {
    const cleanedUrl = url.replace(/[()]/g, '');
    return `<a href="${cleanedUrl}"`;
  });
  
  return cleanedMarkdown;
}

function htmlToMarkdown(url, html) {
  const $ = cheerio.load(html);
  const main = extractMainContent($);
  stripLayoutElements($, main);
  convertInternalLinks($, url);

  const turndown = setupTurndown();
  const innerHtml = main.html() ?? "";
  let markdownBody = turndown.turndown(innerHtml).trim();
  
  markdownBody = cleanMarkdown(markdownBody);

  const parts = [];
  parts.push(`<!-- ${url} -->`);
  parts.push("");
  parts.push(markdownBody);
  
  return parts.join("\n");
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

    console.log(`[${name}] fetch ${url}`);

    let html;
    try {
      html = await fetchHtml(url);
    } catch (e) {
      console.log(`[${name}] error fetching ${url}:`, e.message);
      continue;
    }

    let markdown;
    try {
      markdown = htmlToMarkdown(url, html);
    } catch (e) {
      console.log(
        `[${name}] error converting ${url} to markdown:`,
        e.message
      );
      continue;
    }

    const outFile = urlToFilename(sectionDir, sectionRoot, url);
    try {
      await fs.writeFile(outFile, markdown, "utf8");
    } catch (e) {
      console.log(`[${name}] error writing ${outFile}:`, e.message);
    }

    let newLinks = [];
    try {
      newLinks = extractLinks(html, url, sectionRoot);
    } catch (e) {
      console.log(
        `[${name}] error extracting links from ${url}:`,
        e.message
      );
    }

    for (const link of newLinks) {
      if (!visited.has(link) && !queue.includes(link)) {
        queue.push(link);
      }
    }
  }

  console.log(
    `[${name}] done, saved ${visited.size} pages to ${sectionDir}`
  );
}

async function main() {
  await fs.mkdir(OUT_BASE, { recursive: true });
  for (const [sectionRoot, startUrl] of SECTION_ROOTS.entries()) {
    await crawlSection(sectionRoot, startUrl, 300);
  }
}

const thisFile = fileURLToPath(import.meta.url);
if (process.argv[1] && path.resolve(process.argv[1]) === thisFile) {
  main().catch((e) => {
    console.error(e);
    process.exitCode = 1;
  });
}
