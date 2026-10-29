# Sarang-Nambiar.github.io

Portfolio styled as a mirrorless camera. React + Vite + TypeScript, deployed to GitHub Pages.

## Edit content
- **Projects, experience, awards, bio:** `src/data/portfolio.json`. Folders in the MENU are created automatically from each item's `start` year. Put item images in `public/` and reference them like `"images": ["projects/foo.png"]`.
- **Home screen photos:** drop JPEGs into `assets/` (kept out of git) and run `npm run photos`. This writes optimized WebP files to `public/photos/` and `src/data/photos.json`; commit those.

## Develop
```
npm install
npm run dev
npm run build
```

## Deploy
Push to `main`. In the repo settings, set Pages → Source to **GitHub Actions** (once).
