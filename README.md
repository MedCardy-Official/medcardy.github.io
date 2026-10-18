# MedCardy

A buildless bilingual Persian/English course directory for GitHub Pages. Persian is the default; the language choice is saved locally when storage is available.

Open `index.html` directly or run `python -m http.server 8080` for local preview. No dependencies or build step are required.

- `index.html`: page content and translated text (`data-fa`, `data-en`).
- `styles.css`: dark glass design, responsive layouts and reduced-motion support.
- `script.js`: all 37 course collections, category/university filters, Persian-normalized search and translations.
- `assets/medcardy-logo.svg`: scalable card-and-cross brand symbol, also used as the favicon. `assets/logo.svg` is the matching compatibility asset.
- `assets/medcardy-brand.jpg`: supplied brand reference and social preview image.
- `assets/apple-touch-icon.png`: home-screen icon.

To add a course, append a row to `COURSES` in `script.js`: `[category, persianTitle, englishTitle, commaSeparatedSources, telegramPostId, featured]`. Sources must exist in `UNIVERSITIES`; category keys are defined in `CATEGORIES`. Counts are calculated automatically. Keep the four-university hero statistic in sync if another university is added. MedCardy and Houshmand are sources rather than universities.

Existing nephrology audio statistics and PDF link are retained. All course destinations are Telegram posts; the page does not imply that audio playback happens on the website. The catalogue comes from the supplied quick-access list.

Checks:

```
node --check script.js
python scripts/check_site_files.py
python scripts/check_links.py
```

GitHub Pages serves the root of this repository. Publishing requires pushing the changes to the configured branch.
