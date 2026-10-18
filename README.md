# MedCardy Podcast

Static bilingual website for GitHub Pages. No build or server dependency is required.

The original design is retained: blue gradient hero, light content sections, material metrics, learning steps, course archive, gallery, team, highlights and resource links. Refinements cover logo clarity, restrained glass surfaces, spacing and responsive layout.

All 37 supplied course collections live in `COURSES` in `script.js`. The five categories and six university/source labels are filterable. Persian is the default; language choice is saved locally when possible. Translations are in `translations`.

Run checks with `node --check script.js`, `python scripts/check_site_files.py` and `python scripts/check_links.py`. Preview with `python -m http.server 8080`. GitHub Actions publishes pushes to `main` using the existing workflow.
