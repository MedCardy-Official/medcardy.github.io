# MedCardy Podcast Pages

Repo for the public MedCardy Podcast site that GitHub Pages serves from `main`.

Open `index.html` in a browser to work locally. It has no build step.

The site links to the Telegram podcast channel, the MedCardy platform, the current courses/books, episode highlights, the team, and gallery photos. It also shows sample "current material" counts (episodes, courses, books) — these are placeholders, see below.

The default view is English. The language switch changes the full page between English and Persian, including page direction (LTR/RTL), font, and visible numbers — exactly like abzumsai.github.io, which this site is modeled on.

Site notes live in `docs`, and local checks live in `scripts`.

## File structure

```
medcardy-podcast/
├── index.html
├── styles.css
├── script.js
├── site.webmanifest
├── robots.txt
├── .gitignore
├── README.md
├── assets/
│   ├── medcardy-logo.svg
│   └── gallery/            ← add real photos here (see below)
├── docs/
└── scripts/
    ├── check_links.py
    └── check_site_files.py
```

**Everything must keep this exact folder structure when you upload to GitHub** — `assets/medcardy-logo.svg` has to stay at that path, or the logo and favicon will break.

## Uploading to GitHub Pages

1. Create a new repo, e.g. `medcardy-podcast` (or name it `yourusername.github.io` if you want it at the root of your GitHub Pages account).
2. On the repo page, use **Add file → Upload files**, then drag in the whole downloaded folder (not just individual files) so the `assets/` and `scripts/` subfolders come along with it.
3. Go to **Settings → Pages**, set Source to the `main` branch and `/ (root)` folder, then Save.
4. After a few minutes the site is live at `https://yourusername.github.io/medcardy-podcast/`.

## Editing text (bilingual)

All visible text lives in one place: the `translations` object at the top of `script.js`, with an `en` block and a matching `fa` block. Change a string in both blocks to update it everywhere it appears (the HTML just references keys like `hero.copy` via `data-i18n="hero.copy"`).

Numbers that should flip between Latin and Persian digits (like the metric cards) use two attributes directly in `index.html`:
```html
<strong data-number-en="12" data-number-fa="۱۲">12</strong>
```

## Updating the "current material" numbers

The four counts in the **Episodes** section (courses covered, books covered, episodes published, platform) are **sample placeholders** — update both `data-number-en` / `data-number-fa` in `index.html` for each `<strong>`, and remove the "Sample numbers…" note once they're real (delete the `<p class="section-note placeholder-note" data-i18n="materials.placeholderNote">` line, and its `materials.placeholderNote` entries in `script.js`).

## Adding courses/books and episodes

Each course/book is a `.project-card` block in the **Courses** section of `index.html`, plus a matching `projects.one` / `projects.two` / etc. entry in both language blocks of `script.js`. Copy an existing card + its translation entries as a template, and point the link at the right Telegram post, e.g. `https://t.me/medcardy_podcast/12`.

## Adding real photos

1. Create `assets/gallery/` and drop your images in, e.g. `assets/gallery/session-01.jpg`.
2. In `index.html`, replace a placeholder `<figure class="gallery-placeholder">…</figure>` with a real `<figure>`:
   ```html
   <figure>
     <img src="assets/gallery/session-01.jpg" alt="" width="1100" height="825" decoding="async">
     <figcaption data-i18n="gallery.photo1">Recording session</figcaption>
   </figure>
   ```
3. Do the same for the team section if you want real photos instead of the initials avatars — add `assets/team/name.jpg` and swap in an `<img>` the same way the reference site's `teacher-card` does.

## Local checks (optional but recommended)

```
python3 scripts/check_site_files.py   # confirms every referenced local file actually exists
python3 scripts/check_links.py        # confirms the key external links are present in index.html
```

Both currently pass. If you add new local files (photos, etc.) or new required links, add them to the `required` lists in `scripts/check_site_files.py` / `scripts/check_links.py` so the checks stay meaningful.

## Notes

- Built as a static, dependency-free site — just three files (`index.html`, `styles.css`, `script.js`) plus assets, same as the reference site.
- Layout uses CSS logical properties (`inset-inline-*`, `border-inline-start`, etc.), so the language switch flips the whole layout direction automatically, not just the text.
- Mobile: nav wraps below the header row past 760px width, cards stack to one column, and all buttons stay full touch-target size.
- Language choice is remembered per browser via `localStorage` (key `medcardy-language`), same mechanism as the reference site.
