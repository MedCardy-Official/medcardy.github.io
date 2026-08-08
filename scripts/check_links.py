from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
html = (ROOT / "index.html").read_text(encoding="utf-8")
links = re.findall(r"href=\"([^\"]+)\"", html)
required = [
    "https://t.me/medcardy_podcast",
    "https://medcardy.com",
]

missing = [link for link in required if link not in links]
if missing:
    print("Missing links: " + ", ".join(missing))
    raise SystemExit(1)

print(f"Checked {len(links)} links")
