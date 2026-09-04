# Arun & Neethu — wedding invitation

A standalone, mobile-first digital wedding invitation. Open `index.html` in a browser to preview it, or serve this folder through any static-site host.

## Edit the invitation

1. Open [`config.js`](config.js).
2. Update the names, message, event time, venue links, photo paths, music path, and theme colours in that one file.
3. To change photos, replace files in `assets/images/` and update the matching `assets` paths and alt text in `config.js`. Keep the WebP format for fast loading.

The supplied photos have been compressed for web use, while the original downloads have not been modified.

## Preview locally

From this folder, start a static server. For example, with Python installed:

```powershell
python -m http.server 8080
```

Then open `http://localhost:8080`. Use a server rather than double-clicking the file when testing the audio and social metadata.

## Share preview for WhatsApp

The share image is `assets/images/og-wedding-invitation.jpg` (1200 × 630). Before publishing:

1. Change `siteUrl` in `config.js` to the final `https://` address.
2. Run `node scripts/update-social-meta.mjs` from this folder.
3. Deploy the complete folder to GitHub Pages, Netlify, or Vercel.

WhatsApp and other services read static Open Graph tags, not JavaScript, so running this script is important after changing the final URL. A newly deployed link can take a little time to refresh its cached preview.

## Included interactions

- Tap-to-open cinematic cover and user-initiated background music
- Touch and mouse compatible scratch-to-reveal date card, with a keyboard-accessible reveal button
- Petal celebration, live India-time countdown, smooth scroll reveals, photo gallery, and venue map buttons
- `prefers-reduced-motion` support, semantic landmarks, lazy-loaded gallery images, and visible keyboard focus

Only use the supplied music if you have the rights or permission to share it publicly.
