# portfolio-front

Marco's **personal** project: a single-page portfolio (Angular 20, standalone,
SCSS + GSAP/Lenis). Nothing in this repo belongs to a client or to the work account.

## Commands

| Command | What it does |
|---|---|
| `npm start` | Dev server at http://localhost:4200 |
| `npm run build` | Production build to `dist/portfolio-front/browser` |
| `npm test` | Karma + Jasmine in watch mode |
| `npm run test:ci` | Karma headless, single run (what CI runs) |
| `docker build -t portfolio-front .` | The same image Cloud Build deploys |

Node is pinned in `.nvmrc` (24) and in `engines`. CI uses `node-version-file: .nvmrc`.

## Architecture

A single component: `src/app/app.component.ts` — standalone, with all the portfolio
content (`skillGroups`, `projects`) hardcoded as class properties. The content is in
English; clients are under NDA and are never named.
`src/app/tech-icons.ts` holds the Simple Icons paths (CC0) rendered inline; if you add
a new technology, add its entry there or the chip renders empty.
`src/app/sector-icons.ts` holds hand-drawn stroke marks, one per industry, referenced
from `project.sectorIcon`.

- `src/styles.scss` — design system in CSS custom properties on `:root`: a light
  editorial palette (`--paper`, `--ink`, `--signal`) and the IBM Plex superfamily
  (`--font-main` Sans, `--font-mono` for eyebrows, dates and stage names). Fonts load
  via `<link>` in `src/index.html`, **not** `@import` (which blocks rendering).
  `--signal` is a state, not decoration: it marks "active" and links, nothing else.
- GSAP + ScrollTrigger + SplitText and Lenis initialise in `ngAfterViewInit`, behind an
  `isPlatformBrowser` guard **and** a `prefers-reduced-motion` check. Animations hook
  onto CSS classes (`.reveal`, `.hero-title`, `.hero-lede`, `.hero-eyebrow`,
  `.hero-actions`, `.stages`, `.diagram`) — renaming those classes breaks them
  silently. All the premium GSAP plugins have been free since 3.13; they ship in
  `node_modules/gsap`.
- `app.routes.ts` is empty and there is no `<router-outlet>`: navigation is
  anchor-based (`#about`, `#work`, `#contact`). If real routes ever get added,
  `RouterOutlet` has to be imported back into the component.
- No SSR, no prerender, no HttpClient, no state management, no i18n.

## CI/CD

Two separate systems, and only one of them deploys:

1. **GitHub Actions** (`.github/workflows/ci.yml`) — runs on PRs and on push to `main`:
   headless tests, production build and `docker build`. It deploys nothing. It exists
   to stop a broken build **before** it reaches `main`.
2. **Google Cloud Build → Cloud Run** — configured on the GCP side; there is no
   `cloudbuild.yaml` in the repo. Triggered by push to `main`, project
   `portfolio-435305`, region `us-central1`. It builds the root `Dockerfile`, pushes to
   `us-central1-docker.pkg.dev/portfolio-435305/cloud-run-source-deploy/portfolio-front`
   and deploys the `portfolio-front` Cloud Run service. The public domain is
   `https://itsmarco.dev/`, hardcoded in the `src/index.html` meta tags (`canonical`,
   `og:url`, `og:image`) because crawlers need absolute URLs. If the domain changes,
   those four lines have to change with it.

Practical consequence: **push to `main` = deploy to production**. There is no staging.

`EXPOSE 80` in the Dockerfile is not decorative: Cloud Run reads the container port
from it. Changing it means changing the service port in GCP too, or the deploy stops
responding.

## Conventions

- TypeScript in `strict` + `strictTemplates` mode. Do not loosen this to make a build pass.
- SCSS for styles; no Tailwind, no component libraries.
- Templates use native control flow (`@for`). `CommonModule` is no longer imported.
- No ESLint, no Prettier. `.editorconfig` rules: 2 spaces, single quotes.
- Everything committed to this repo is written in English — code, comments and docs.

## Account and identity (do not change)

- Remote: `https://github.com/Palissp/portfolio-front.git` — personal account **Palissp**.
- Commit identity pinned in `.git/config` (local, wins over the global one):
  `user.name = Palissp` / `user.email = marco.perezj96@gmail.com`.
- Push credential pinned to `Palissp` (`credential.https://github.com.username`).
- The active `gh` account must be `Palissp`. If it is not: `gh auth switch --user Palissp`.
  A hook in `.claude/settings.json` blocks any `gh` command when another account is
  active. `auth` subcommands pass through, so the switch above is never blocked by it.
- `gh` reads its account from a per-repo config directory, not from one global setting.
  A block in `~/.zshenv` exports `GH_CONFIG_DIR=~/.config/gh-palissp` whenever the
  origin remote belongs to `Palissp`, and unsets it everywhere else — so this repo is
  always personal and work repos keep the default config. That block lives outside the
  repo; if you clone this on another machine, it has to be set up again. The tokens
  themselves are in the macOS keychain and are shared across config directories, so a
  new config dir needs no re-authentication.
- **Never** use the `marcoperez-twiins` account, or any work account, in this repo.

## Working rules

- Do not use the `twiins-pr` skill here: it is specific to TwiinsHRM (commit format,
  cross-linked BE/FE PRs, and so on). PRs in this repo are created by hand with
  `gh pr create`.
- Never `git commit` or `git push` without explicit approval from the user.

## Known debt

- `AppComponent` has no `ngOnDestroy`: Lenis and the ScrollTriggers are never destroyed.
  Irrelevant today (the component lives as long as the page does); it matters the moment
  routes appear.
- No ESLint. No e2e.
