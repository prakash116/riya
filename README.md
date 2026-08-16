# Riya Closet

A responsive fashion landing page built with Next.js, TypeScript, and Tailwind CSS.

## Live site

https://prakash116.github.io/riya/

## Develop locally

```bash
npm ci
npm run dev
```

## Production build

```bash
npm run build
```

## Deployment

Pushing to `main` deploys the static site to GitHub Pages through GitHub Actions.

## Project structure

- `app/` contains the Next.js route and global styles.
- `components/` contains the landing-page sections and UI primitives.
- `lib/` contains content data shared by the components.

## Assets

Product and editorial images are stored in `public/images/`. Keep image references rooted at `/images/`; the deployment build adds the GitHub Pages repository path automatically.
