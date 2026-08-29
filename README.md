# Mohamed Shil — Resume

A single-page React resume, built with Vite.

## Run locally

```bash
npm install
npm run dev
```

Then open the printed localhost URL in your browser.

## Build for production

```bash
npm run build
```

This outputs a static site to the `dist/` folder — a plain folder of HTML/CSS/JS
that can be hosted anywhere.

## Deploy

**Vercel**
1. Push this folder to a GitHub repo.
2. Go to vercel.com → "Add New Project" → import the repo.
3. Vercel auto-detects Vite; leave defaults (build command `npm run build`,
   output directory `dist`) and click Deploy.

**Netlify**
1. Push this folder to a GitHub repo (or drag-and-drop the `dist/` folder
   after running `npm run build` into netlify.com/drop).
2. If connecting a repo: build command `npm run build`, publish directory `dist`.

**GitHub Pages**
1. Run `npm run build`.
2. Push the contents of `dist/` to a `gh-pages` branch (or use the
   `gh-pages` npm package), and enable Pages on that branch in your repo settings.

## Editing content

All resume content (name, experience, education, skills, etc.) lives in
`src/App.jsx` as plain JS arrays near the top of the file — edit those directly
and the layout will update automatically.
