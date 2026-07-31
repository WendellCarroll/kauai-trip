# 🌺 Kauai Countdown

A private-family PWA (Progressive Web App) with a countdown to our Kauai trip,
live weather + Kauai local time, a live north-shore webcam, and a personal
trip checklist that persists in the browser.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | The app itself (HTML + CSS + JS in one file) |
| `manifest.webmanifest` | PWA manifest — name, icons, colors, install behavior |
| `service-worker.js` | Caches files for offline use + enables "Install app" prompt |
| `icon.svg` | Vector icon (used by desktop browsers) |
| `icon-192.png` / `icon-512.png` | PWA icons at required sizes |
| `icon-maskable-512.png` | Android adaptive-icon safe zone version |

## Deploy to GitHub Pages

1. Create a new **GitHub repo** (public or private — both work for Pages).
2. Upload all files in this folder to the repo root.
3. In the repo, go to **Settings → Pages**.
4. Under **Source**, pick **Deploy from a branch** and select `main` / `(root)`.
5. Save. Within ~1 minute your site will be live at:
   `https://<your-username>.github.io/<repo-name>/`
6. Open that URL on your phone/tablet in **Chrome** → menu → **Install app**
   (or **Add to Home screen**). It gets an icon, launches fullscreen, and
   works offline for the shell (weather + webcam obviously need internet).

## Local development

From this folder:

```powershell
python -m http.server 8765 --bind 127.0.0.1
```

Then open http://127.0.0.1:8765/ — the service worker works on localhost.

## Data

The checklist is stored in the browser's `localStorage` under the key
`kauai-tasks-v1`. It persists across reboots but is **per-device**. To sync
between devices we'd need to add a small backend (Firebase, Supabase, etc.).

## Updating the app

After changing files, bump the `CACHE` version in `service-worker.js`
(e.g. `kauai-v1` → `kauai-v2`) so installed clients pick up the new files
on the next visit.
