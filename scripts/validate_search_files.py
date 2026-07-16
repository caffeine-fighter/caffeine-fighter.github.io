#!/usr/bin/env python3
"""Validate the built robots.txt, sitemap.xml, and each sitemap canonical."""

from __future__ import annotations

from html.parser import HTMLParser
from pathlib import Path
import sys
from urllib.parse import unquote, urlsplit
import xml.etree.ElementTree as ET


BASE_URL = "https://caffeine-fighter.github.io/"
HOST = "caffeine-fighter.github.io"
SITEMAP_URL = f"{BASE_URL}sitemap.xml"
SITEMAP_NAMESPACE = "http://www.sitemaps.org/schemas/sitemap/0.9"
REQUIRED_URLS = {
    BASE_URL,
    f"{BASE_URL}profile/",
    f"{BASE_URL}resume/",
    f"{BASE_URL}p/20260711-organization-operations-review/",
}
STANDALONE_PAGES = ("profile/", "resume/")
NOINDEX_PAGES = ("search/", "archives/")
ABSENT_PAGES = (
    "p/test123/",
    "p/20260601-profile/",
    "links/",
    "categories/music-work-reviews/",
    "categories/study-diary/",
    "categories/subculture-event-reviews/",
)


class HeadMetadataParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.canonicals: list[str] = []
        self.robots: list[str] = []

    def handle_starttag(
        self, tag: str, attrs: list[tuple[str, str | None]]
    ) -> None:
        attributes = {key.lower(): value or "" for key, value in attrs}
        if tag.lower() == "link":
            rel = attributes.get("rel", "").lower().split()
            if "canonical" in rel:
                self.canonicals.append(attributes.get("href", ""))
        elif tag.lower() == "meta" and attributes.get("name", "").lower() == "robots":
            self.robots.append(attributes.get("content", "").lower())


def fail(message: str) -> None:
    raise SystemExit(f"Search-file validation failed: {message}")


def read_utf8(path: Path) -> str:
    try:
        return path.read_text(encoding="utf-8")
    except FileNotFoundError:
        fail(f"missing {path}")
    except UnicodeDecodeError as error:
        fail(f"{path} is not valid UTF-8: {error}")


def parse_head(path: Path) -> HeadMetadataParser:
    parser = HeadMetadataParser()
    parser.feed(read_utf8(path))
    return parser


def output_path_for_url(public_dir: Path, url: str) -> Path:
    path = unquote(urlsplit(url).path)
    if not path.startswith("/") or ".." in Path(path).parts:
        fail(f"unsafe URL path in sitemap: {url}")
    relative = path.lstrip("/")
    if not relative or relative.endswith("/"):
        relative = f"{relative}index.html"
    return public_dir / Path(relative)


def expected_public_pages(public_dir: Path) -> set[str]:
    expected = {BASE_URL}
    for relative_url in STANDALONE_PAGES:
        html_path = public_dir / relative_url / "index.html"
        page_url = f"{BASE_URL}{relative_url}"
        if not html_path.is_file():
            fail(f"expected standalone page is missing: /{relative_url}")
        metadata = parse_head(html_path)
        if metadata.canonicals != [page_url]:
            fail(f"standalone page canonical mismatch for {page_url}")
        if any("noindex" in value for value in metadata.robots):
            fail(f"standalone page is marked noindex: {page_url}")
        expected.add(page_url)

    posts_dir = public_dir / "p"
    if posts_dir.exists():
        for html_path in posts_dir.glob("**/index.html"):
            relative_dir = html_path.parent.relative_to(public_dir).as_posix()
            page_url = f"{BASE_URL}{relative_dir}/"
            metadata = parse_head(html_path)
            # Hugo may generate redirect aliases under /p/. Only self-canonical pages
            # belong in the sitemap.
            if metadata.canonicals == [page_url] and not any(
                "noindex" in value for value in metadata.robots
            ):
                expected.add(page_url)
    return expected


def validate_robots(public_dir: Path) -> None:
    robots = read_utf8(public_dir / "robots.txt").replace("\r\n", "\n")
    expected = f"User-agent: *\nAllow: /\n\nSitemap: {SITEMAP_URL}\n"
    if robots != expected:
        fail("robots.txt does not exactly match the allow-all policy and sitemap URL")


def validate_sitemap(public_dir: Path) -> int:
    sitemap_path = public_dir / "sitemap.xml"
    sitemap_text = read_utf8(sitemap_path)
    if sitemap_path.stat().st_size > 50_000_000:
        fail("sitemap.xml exceeds Google's 50 MB uncompressed limit")
    if not sitemap_text.startswith('<?xml version="1.0" encoding="UTF-8"?>'):
        fail("sitemap.xml must begin with an UTF-8 XML declaration")

    try:
        root = ET.fromstring(sitemap_text)
    except ET.ParseError as error:
        fail(f"sitemap.xml is invalid XML: {error}")

    if root.tag != f"{{{SITEMAP_NAMESPACE}}}urlset":
        fail("sitemap.xml has the wrong urlset namespace")

    url_elements = list(root)
    if not url_elements:
        fail("sitemap.xml contains no URLs")
    if len(url_elements) > 50_000:
        fail("sitemap.xml exceeds Google's 50,000 URL limit")

    locations: list[str] = []
    for element in url_elements:
        if element.tag != f"{{{SITEMAP_NAMESPACE}}}url":
            fail(f"unexpected sitemap element: {element.tag}")
        children = list(element)
        if len(children) != 1 or children[0].tag != f"{{{SITEMAP_NAMESPACE}}}loc":
            fail("each sitemap URL must contain exactly one loc element")
        location = (children[0].text or "").strip()
        parsed = urlsplit(location)
        if (
            parsed.scheme != "https"
            or parsed.hostname != HOST
            or parsed.port is not None
            or parsed.username is not None
            or parsed.password is not None
            or parsed.query
            or parsed.fragment
        ):
            fail(f"sitemap URL must be an absolute, clean URL on {HOST}: {location}")
        if not parsed.path.endswith("/"):
            fail(f"sitemap page URL must use its canonical trailing slash: {location}")
        locations.append(location)

    if len(locations) != len(set(locations)):
        fail("sitemap.xml contains duplicate URLs")

    expected = expected_public_pages(public_dir)
    actual = set(locations)
    if not REQUIRED_URLS.issubset(actual):
        fail(f"sitemap.xml is missing required URLs: {sorted(REQUIRED_URLS - actual)}")
    if actual != expected:
        missing = sorted(expected - actual)
        unexpected = sorted(actual - expected)
        fail(f"sitemap URL set differs from published posts; missing={missing}, unexpected={unexpected}")

    for location in locations:
        html_path = output_path_for_url(public_dir, location)
        if not html_path.is_file():
            fail(f"sitemap URL has no generated HTML file: {location}")
        metadata = parse_head(html_path)
        if metadata.canonicals != [location]:
            fail(
                f"sitemap canonical mismatch for {location}: {metadata.canonicals}"
            )
        if any("noindex" in value for value in metadata.robots):
            fail(f"sitemap URL is marked noindex: {location}")

    return len(locations)


def validate_excluded_pages(public_dir: Path) -> None:
    for relative_url in NOINDEX_PAGES:
        html_path = public_dir / relative_url / "index.html"
        if not html_path.is_file():
            fail(f"expected utility page is missing: /{relative_url}")
        metadata = parse_head(html_path)
        expected_url = f"{BASE_URL}{relative_url}"
        if metadata.canonicals != [expected_url]:
            fail(f"utility page canonical mismatch for {expected_url}")
        if metadata.robots != ["noindex, follow"]:
            fail(f"utility page must have exactly one noindex, follow directive: {expected_url}")

    for relative_url in ABSENT_PAGES:
        html_path = public_dir / relative_url / "index.html"
        if html_path.exists():
            fail(f"draft or empty page was unexpectedly published: /{relative_url}")


def main() -> None:
    public_dir = Path(sys.argv[1] if len(sys.argv) > 1 else "public").resolve()
    validate_robots(public_dir)
    count = validate_sitemap(public_dir)
    validate_excluded_pages(public_dir)
    print(
        f"Validated robots.txt, sitemap.xml ({count} canonical URLs), "
        "and excluded utility pages."
    )


if __name__ == "__main__":
    main()
