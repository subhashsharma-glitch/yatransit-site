# YA Transit website (first draft)

Static website for **Yorkshire Autonomous Transit Ltd** (YA Transit). Plain HTML, CSS and a small amount of vanilla JavaScript. No build step, no dependencies, no cookies or third-party requests. Fonts (Inter and Space Grotesk, SIL Open Font Licence) are hosted in `assets/fonts/`.

## Files

```
index.html          Home page (all main sections, anchor navigation)
privacy.html        Privacy notice – DRAFT TEMPLATE, review before publishing
resources.html      Resources page – free downloadable guides and templates
resources/          Published downloads, their WebP thumbnails and published.json (manifest)
404.html            "Page not found" page (GitHub Pages uses it automatically)
css/styles.css      All styles
js/main.js          Mobile menu and footer year
favicon.svg / .ico  Browser icons
assets/             Logos (SVG), Apple touch icon, social sharing image, fonts
robots.txt, sitemap.xml
screenshots/        Preview images (local only – excluded from the repository by .gitignore)
_dev/               Helper scripts used to make the screenshots, icons and social image
                    (Python + Playwright). Local only – excluded from the repository by .gitignore.
```

## Adding a download to the Resources page

1. Copy the file into `resources/` with a lowercase, URL-safe name (e.g. `my-guide.pdf`). Don't edit the original; edit the copy if anything needs changing.
2. Add a thumbnail as a WebP about 480 px wide (4:5 like the others), e.g. `resources/my-guide-thumb.webp`.
3. Copy one of the `<article class="resource-card">` blocks in `resources.html` and update the title, description, file type, size and links.
4. Add an entry to `resources/published.json` with the source path and the date published.

## Preview locally

Open `index.html` in a browser, or run a tiny local server from this folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Before you publish – placeholders to fill in

Search the files for `[` to find them all:

- `[Date]` – "Last updated" date on the privacy notice.
- `[ICO registration number, if applicable]` – privacy notice (check whether you need to pay the ICO data protection fee).
- `[Email hosting provider for hello@yatransit.co.uk, e.g. IONOS]`, safeguards for international transfers and the `[retention period]` – privacy notice.
- `hello@yatransit.co.uk` – make sure this mailbox exists (or change it everywhere).
- Remove the yellow "Draft template" box from `privacy.html` once finalised.

## Publishing free on GitHub Pages with your custom domain

1. Create a GitHub repository (e.g. `yatransit-site`) and upload the contents of this folder to the root of the `main` branch.
2. In the repository go to **Settings → Pages**. Under "Build and deployment" choose **Deploy from a branch**, branch `main`, folder `/ (root)`, and save.
3. Under **Custom domain** enter `yatransit.co.uk` and save. GitHub will add a `CNAME` file to the repository.
4. At your domain registrar, set the DNS for `yatransit.co.uk`:
   - `A` records for the apex (`@`) pointing to GitHub Pages' IP addresses, and `AAAA` records for IPv6 – copy the current values from GitHub's documentation: <https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site>
   - A `CNAME` record for `www` pointing to `<your-github-username>.github.io`.
5. Once DNS has updated (this can take a few hours), tick **Enforce HTTPS** in Settings → Pages.
6. Optional but recommended: verify the domain in your GitHub account settings (Settings → Pages → "Add a domain") to prevent takeover.

### The other domains (yatransit.uk and yatransit.com)

A GitHub Pages site can only have one custom domain. Point the other two at the main site using your registrar's **URL forwarding / 301 redirect** feature (redirect `yatransit.uk`, `www.yatransit.uk`, `yatransit.com` and `www.yatransit.com` to `https://yatransit.co.uk`).

## Notes on content

- Wording deliberately avoids statistics, dates, partnerships or testimonials. Benefits are phrased as aims.
- Regulatory wording refers to the Automated Vehicles Act 2024 (Royal Assent 20 May 2024). Keep an eye on implementation and update the "Road to launch" section as things progress.
- There is one mention of Tesla's Cybercab, as an example vehicle type, in the FAQ ("What vehicles will you use?"), with a trademark and non-affiliation line in the footer. If you remove the FAQ mention, remove the footer line as well.
