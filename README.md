# MedCardy Podcast

Static bilingual website for GitHub Pages. No build or server dependency is required.

The original design is retained: blue gradient hero, light content sections, material metrics, learning steps, course archive, gallery, team, highlights and resource links. Refinements cover logo clarity, restrained glass surfaces, spacing and responsive layout.

All 37 supplied course collections live in `COURSES` in `script.js`. The five categories and six university/source labels are filterable. Persian is the default; language choice is saved locally when possible. Translations are in `translations`.

Run checks with `node --check script.js`, `python scripts/check_site_files.py` and `python scripts/check_links.py`. Preview with `python -m http.server 8080`. GitHub Actions publishes pushes to `main` using the existing workflow.

The landing header and hero now follow the supplied summit layout reference, with the original blue gradient and light header, a two-column introduction and a glass overview panel. The rest of the original page structure and fixed course card dimensions are retained.

## MedCardy Termic

The home header links to `#termic`. The cohort card opens `termic-beheshti-1404.html` (Shahid Beheshti, 1404 entry cohort). It shares the main theme, bilingual controls and square, fixed-size course cards. Semester, category and text search are independent of the public catalogue.

Confirmed dedicated courses go in `TERMIC_COHORT.courses` in `termic-data.js`. The list is intentionally empty until the cohort-specific course links are supplied. Each entry uses `category`, `universities`, `label`, `labelEn`, `link`, `source` (localized object or null), optional `cover` and `notesLink`, plus a positive integer `semester`. Semester/category filters are populated from the actual entries. The course list is not copied from the public archive.

All page links use relative HTML paths and work on GitHub Pages without server routing.

Cohort panels have two sections: exam dates and created courses. In `termic-data.js`, add confirmed exams to `exams` with `semester`, localized `label`/`labelEn`, an ISO Gregorian `date` (or null) and optional `time`. Add registered semester numbers to `semesters`. One semester filter controls both sections; older terms stay in the same cohort page. Selected semesters can be shared using `?semester=1`.

Semester 3 contains 11 distinct subjects from the supplied exam schedule. Midterms/finals and theory/practical exams share their subject card. All currently have `status: "processing"` and `link: null`. On publication, set `status: "ready"` and provide the confirmed course link; the card then shows Ready and its access link. Public course cards are unaffected.
