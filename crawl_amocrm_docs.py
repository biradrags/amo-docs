import pathlib
import typing as t
import urllib.parse as up

import requests
from bs4 import BeautifulSoup, Tag
from markdownify import markdownify as md


SECTIONS: list[str] = [
    "https://www.amocrm.ru/developers/content/crm_platform/platform-abilities",
    "https://www.amocrm.ru/developers/content/oauth/oauth",
    "https://www.amocrm.ru/developers/content/integrations/release-spring-2022",
    "https://www.amocrm.ru/developers/content/digital_pipeline/webhooks",
    "https://www.amocrm.ru/developers/content/catalogs/capabilities",
    "https://www.amocrm.ru/developers/content/telephony/capabilities-2",
    "https://www.amocrm.ru/developers/content/chats/chat-capabilities",
    "https://www.amocrm.ru/developers/content/files/files-capabilities",
    "https://www.amocrm.ru/developers/content/notifications/center_capabilities",
    "https://www.amocrm.ru/developers/content/web_sdk/start",
]

OUT_BASE = pathlib.Path("amocrm_docs_md")

USER_AGENT = "amocrm-docs-crawler/1.0 (+https://www.amocrm.ru/developers/content/crm_platform/platform-abilities)"


def _build_section_root(url: str) -> str:
    if not url.endswith("/"):
        url = url.rsplit("/", 1)[0] + "/"
    return url


SECTION_ROOTS: dict[str, str] = { _build_section_root(u): u for u in SECTIONS }


session = requests.Session()
session.headers["User-Agent"] = USER_AGENT


def normalize_url(base_url: str, href: str | None, section_root: str) -> str | None:
    if not href:
        return None
    href = href.split("#", 1)[0]
    if not href:
        return None
    url = up.urljoin(base_url, href)
    if not url.startswith(section_root):
        return None
    return url


def section_name_from_root(section_root: str) -> str:
    return section_root.strip("/").split("/")[-1]


def url_to_filename(section_dir: pathlib.Path, section_root: str, url: str) -> pathlib.Path:
    parsed = up.urlparse(url)
    rel = parsed.path
    root_parsed = up.urlparse(section_root)
    root_path = root_parsed.path
    if rel.startswith(root_path):
        rel = rel[len(root_path):]
    rel = rel.strip("/")
    if not rel:
        rel = "index"
    safe = rel.replace("/", "_")
    return section_dir / f"{safe}.md"


def extract_main_content(soup: BeautifulSoup) -> Tag:
    for selector in [
        "div.content-block__inner",
        "div.content-block__text",
        "main.page_main",
        "div.page_wrapper.developers",
        "div.developers-content",
        "div.developers-article",
        "div.content__inner",
        "div.layout__content",
        "main",
    ]:
        found = soup.select_one(selector)
        if isinstance(found, Tag):
            return found
    body = soup.body
    return body if isinstance(body, Tag) else soup


def strip_layout_elements(root: Tag) -> None:
    for selector in [
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
    ]:
        for el in root.select(selector):
            el.decompose()


def fetch_html(url: str) -> str:
    resp = session.get(url, timeout=20)
    resp.raise_for_status()
    resp.encoding = resp.apparent_encoding or resp.encoding
    return resp.text


def html_to_markdown(url: str, html: str) -> str:
    soup = BeautifulSoup(html, "html.parser")
    main = extract_main_content(soup)
    strip_layout_elements(main)
    markdown = md(str(main), heading_style="ATX")
    return f"# {url}\n\n{markdown}"


def extract_links(html: str, base_url: str, section_root: str) -> list[str]:
    soup = BeautifulSoup(html, "html.parser")
    links: list[str] = []
    for a in soup.find_all("a"):
        href = a.get("href")
        norm = normalize_url(base_url, href, section_root)
        if norm and norm not in links:
            links.append(norm)
    return links


def crawl_section(section_root: str, start_url: str, max_pages: int = 200) -> None:
    name = section_name_from_root(section_root)
    section_dir = OUT_BASE / name
    section_dir.mkdir(parents=True, exist_ok=True)

    queue: list[str] = [start_url]
    visited: set[str] = set()

    while queue and len(visited) < max_pages:
        url = queue.pop(0)
        if url in visited:
            continue
        visited.add(url)

        print(f"[{name}] fetch {url}")
        try:
            html = fetch_html(url)
        except Exception as e:
            print(f"[{name}] error fetching {url}: {e}")
            continue

        try:
            markdown = html_to_markdown(url, html)
        except Exception as e:
            print(f"[{name}] error converting {url} to markdown: {e}")
            continue

        out_file = url_to_filename(section_dir, section_root, url)
        out_file.write_text(markdown, encoding="utf-8")

        try:
            new_links = extract_links(html, url, section_root)
        except Exception as e:
            print(f"[{name}] error extracting links from {url}: {e}")
            new_links = []

        for link in new_links:
            if link not in visited and link not in queue:
                queue.append(link)

    print(f"[{name}] done, saved {len(visited)} pages to {section_dir}")


def main() -> None:
    OUT_BASE.mkdir(exist_ok=True)
    for section_root, start_url in SECTION_ROOTS.items():
        crawl_section(section_root=section_root, start_url=start_url, max_pages=300)


if __name__ == "__main__":
    main()


