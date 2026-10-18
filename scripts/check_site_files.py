from pathlib import Path
import re
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]
required = [
    "index.html",
    "termic-beheshti-1404.html",
    "termic-data.js",
    "termic.js",
    "termic-directory.js",
    "styles.css",
    "script.js",
    "assets/medcardy-logo.svg",
    "robots.txt",
    "site.webmanifest",
]

html = "\n".join(page.read_text(encoding="utf-8") for page in ROOT.glob("*.html"))
sources = re.findall(r"(?:src|data-src)=\"([^\"]+)\"", html)
required.extend(urlsplit(source).path for source in sources if not source.startswith("http"))

missing = [name for name in required if not (ROOT / name).exists()]
if missing:
    print("Missing files: " + ", ".join(missing))
    raise SystemExit(1)

print("Site files are present")
