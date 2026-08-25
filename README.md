# portfolio-front

Personal portfolio of Marco Pérez — a single-page Angular 20 site with GSAP scroll
animations and Lenis smooth scrolling.

**Live:** https://itsmarco.dev/

## Requirements

Node 24 (see `.nvmrc`). `nvm use` picks it up.

## Development

```bash
npm ci
npm start          # http://localhost:4200
```

## Build & test

```bash
npm run build      # production bundle → dist/portfolio-front/browser
npm run test:ci    # Karma + Jasmine, headless, single run
npm test           # same, in watch mode
```

## Docker

The image is nginx serving the static bundle. This is exactly what gets deployed.

```bash
docker build -t portfolio-front .
docker run --rm -p 8080:80 portfolio-front   # http://localhost:8080
```

## Deployment

Pushing to `main` deploys to production at https://itsmarco.dev/. Google Cloud Build
watches the branch, builds this `Dockerfile`, and deploys the `portfolio-front`
service on Cloud Run (project `portfolio-435305`, region `us-central1`). The build
config lives in GCP, not in this repo. The domain is hardcoded in the
`src/index.html` meta tags, because crawlers need absolute URLs for `og:image`.

GitHub Actions (`.github/workflows/ci.yml`) runs tests, the production build and a
`docker build` on every pull request — it does not deploy, it just stops a broken
build from reaching `main`.

## Project layout

```
public/                  # served at the site root
├─ favicon.svg           # brand mark, also the apple-touch-icon source
├─ og-image.png          # 1200x630 social card
└─ marco-perez.jpg       # portrait used in the About section
src/
├─ index.html            # title, meta description, canonical, OG tags, font <link>s
├─ styles.scss           # design tokens on :root + global reset
└─ app/
   ├─ app.component.*    # the entire page: markup, styles, content, animations
   ├─ tech-icons.ts      # Simple Icons paths (CC0), rendered inline
   ├─ sector-icons.ts    # hand-drawn stroke marks, one per industry
   ├─ app.config.ts
   └─ app.routes.ts      # empty — navigation is anchor-based
```

See [CLAUDE.md](./CLAUDE.md) for architecture notes and conventions.
