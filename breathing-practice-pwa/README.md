# Breathing Practice PWA

This is the original Flask breathing app converted to a static Progressive Web App.

## What's changed

- Removed the Flask/Python dependency.
- Moved the breathing technique data into `static/script.js`.
- Kept the existing techniques, descriptions, tips, timer, progress bar, and controls.
- Added `manifest.json` so the site can be installed as an app.
- Added `sw.js` for offline caching.
- Added a simple app icon.
- Made the page mobile-friendly.

## Run locally

Because service workers require HTTPS (or localhost), use a local static server instead of opening `index.html` directly.

With Python installed:

```bash
python -m http.server 8000
```

Then open:

http://localhost:8000

## Install on Android

Host this folder on a free HTTPS static host such as GitHub Pages or Netlify.

Open the HTTPS URL in Chrome on Android, then choose:

Menu (⋮) -> Add to Home screen / Install app

The exact wording can vary by Chrome version.

## Important

The app itself is fully static. It does not need Flask, a database, or a server-side API.
