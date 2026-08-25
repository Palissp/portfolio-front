# portfolio-front

Proyecto **personal** de Marco: portfolio de una sola página (Angular 20, standalone,
SCSS + GSAP/Lenis). Nada de este repo pertenece a un cliente ni a la cuenta de trabajo.

## Comandos

| Comando | Qué hace |
|---|---|
| `npm start` | Dev server en http://localhost:4200 |
| `npm run build` | Build de producción a `dist/portfolio-front/browser` |
| `npm test` | Karma + Jasmine en modo watch |
| `npm run test:ci` | Karma headless, una corrida (lo que corre CI) |
| `docker build -t portfolio-front .` | Misma imagen que despliega Cloud Build |

Node fijado en `.nvmrc` (24) y en `engines`. CI usa `node-version-file: .nvmrc`.

## Arquitectura

Un único componente: `src/app/app.component.ts` — standalone, con todo el contenido
del portfolio (`skills`, `projects`) hardcodeado como propiedades de clase.

- `src/styles.scss` — design system en CSS custom properties sobre `:root`
  (paleta oscura, `--font-main: Inter`, `--font-display: Outfit`). Las fuentes se
  cargan con `<link>` en `src/index.html`, **no** con `@import` (bloquea el render).
- GSAP + ScrollTrigger y Lenis se inicializan en `ngAfterViewInit`, detrás de un
  guard `isPlatformBrowser`. Las animaciones enganchan por clase CSS (`.reveal`,
  `.hero-title`, `.hero-subtitle`) — si renombrás esas clases, se rompen en silencio.
- `app.routes.ts` está vacío y no hay `<router-outlet>`: la navegación es por anchors
  (`#about`, `#projects`, `#contact`). Si agregás rutas de verdad, hay que volver a
  importar `RouterOutlet` en el componente.
- Sin SSR, sin prerender, sin HttpClient, sin state management, sin i18n.

## CI/CD

Son dos sistemas distintos y sólo uno despliega:

1. **GitHub Actions** (`.github/workflows/ci.yml`) — corre en PRs y en push a `main`:
   tests headless, build de producción y `docker build`. No despliega nada. Existe
   para frenar un build roto **antes** de que llegue a `main`.
2. **Google Cloud Build → Cloud Run** — configurado del lado de GCP, no hay
   `cloudbuild.yaml` en el repo. Trigger sobre push a `main`, proyecto
   `portfolio-435305`, región `us-central1`. Buildea el `Dockerfile` de la raíz,
   pushea a `us-central1-docker.pkg.dev/portfolio-435305/cloud-run-source-deploy/portfolio-front`
   y despliega el servicio Cloud Run `portfolio-front`.

Consecuencia práctica: **push a `main` = deploy a producción**. No hay staging.

`EXPOSE 80` en el Dockerfile no es decorativo: Cloud Run toma el puerto del
contenedor de ahí. Si lo cambiás, hay que cambiar el puerto del servicio en GCP o
el deploy queda sin responder.

## Convenciones

- TypeScript en modo `strict` + `strictTemplates`. No aflojar esto para hacer pasar un build.
- SCSS para estilos; nada de Tailwind ni librerías de componentes.
- Los templates usan `*ngFor` con `CommonModule`. Si tocás uno, migralo a `@for`.
- Sin ESLint ni Prettier configurados. `.editorconfig` manda: 2 espacios, comillas simples.

## Cuenta e identidad (no cambiar)

- Remote: `https://github.com/Palissp/portfolio-front.git` — cuenta personal **Palissp**.
- Identidad de commits fijada en `.git/config` (local, gana sobre el global):
  `user.name = Palissp` / `user.email = marco.perezj96@gmail.com`.
- Credencial de push fijada a `Palissp` (`credential.https://github.com.username`).
- La cuenta activa de `gh` debe ser `Palissp`. Si no lo es: `gh auth switch --user Palissp`.
  Un hook en `.claude/settings.json` bloquea cualquier comando `gh` si la cuenta activa es otra.
- **Nunca** usar la cuenta `marcoperez-twiins` ni ninguna cuenta de trabajo en este repo.

## Reglas de trabajo

- No usar la skill `twiins-pr` acá: es específica de TwiinsHRM (formato de commits,
  PRs cruzados BE/FE, etc.). Los PRs de este repo se hacen a mano con `gh pr create`.
- No hacer `git commit` ni `git push` sin aprobación explícita del usuario.

## Deuda conocida

- Contenido placeholder: los 3 proyectos son inventados y las imágenes son hotlinks a
  Unsplash. El footer dice "© 2024". El mail de contacto es `hello@marcoperez.dev`.
- `AppComponent` no tiene `ngOnDestroy`: Lenis y los ScrollTrigger nunca se destruyen.
  Irrelevante hoy (el componente vive lo que vive la página), importa si aparecen rutas.
- Sin `prefers-reduced-motion` alrededor de las animaciones.
- Sin ESLint. Sin e2e.
