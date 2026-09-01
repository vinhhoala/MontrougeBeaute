# Montrouge Beauté — website

Single-page marketing site for the Montrouge Beauté nail salon. Static HTML/CSS/JS, no
build step, no framework, no package.json — open `index.html` directly or serve the
folder with any static file server.

- `index.html` — everything: hero, atouts, services, tarifs (pricing), galerie
  (lightbox), contact/accès. One page, anchor-linked sections (`#accueil`, `#services`,
  `#tarifs`, `#galerie`, `#contact`).
- `css/style.css` — design tokens as CSS custom properties at the top of the file
  (`--clr-*`, `--ff-*`, `--space-*`). Change colors/spacing/type there, not inline.
  Fonts: Playfair Display (serif, headings) + Raleway (sans, body), loaded from Google
  Fonts in `index.html`'s `<head>`.
- `js/main.js` — vanilla JS, no dependencies: promo bar dismiss, header shrink-on-scroll,
  mobile hamburger nav, tab switching, scroll-reveal animations, gallery lightbox.

## Images are NOT in this repo

`index.html` references photos under `img/nails/...`, but **no image files are
git-tracked** and `img/nails/` is empty/absent in a fresh checkout. Gallery/hero images
live only on the production server and are uploaded there directly (FTP) — not through
git. When editing the gallery markup, cross-check filenames against what's actually
deployed rather than what's present locally.

## Deploy

Production is `https://montrouge-beaute.com`, deployed via FTP to
`ftp.montrouge-beaute.com` (see `.claude/settings.local.json` — allowed commands hint at
`curl`/`sshpass` FTP transfers used historically). This repo's `git push` to
`origin` (github.com/vinhhoala/MontrougeBeaute) does **not** by itself update the live
site — pushing and deploying are separate steps here.

## Conventions

- Commit messages describe the user-facing change (e.g. "Add May 2026 promo bar: -30%
  sur toutes les prestations"), not the mechanics.
- Content is in French; keep copy, alt text, and aria-labels in French.
- `msfinstall` at repo root is an empty placeholder file — not part of the site, safe to
  ignore.
