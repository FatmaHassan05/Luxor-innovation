# Luxor University Innovation Platform – Frontend

Angular 21 · standalone components · Signals · PrimeNG · Bootstrap grid · Almarai.
Target backend: ASP.NET Core Web API (EF Core code-first, SQL Server). **No backend is connected yet.**

## Run
```bash
npm install
npm start          # http://localhost:4200
npm run build
```
> This code was authored without the ability to install packages or compile.
> Expect to fix small version/typing issues on the first `npm install && ng build`
> (e.g. if `primeng@^21` is unavailable, use the PrimeNG major that matches Angular 21).

## Demo mode (`environment.useMocks = true`)
Sign in at `/researcher/login`, `/company/login`, `/judge/login`, `/admin/login` using the demo
account shown on each page. **This is not real authentication**: credentials are in client code.
Production build sets `useMocks=false` and uses `HttpAuthApi`, whose endpoints are a *proposed*
contract to align with the API.

## Structure
```
src/app/
  core/        models, i18n (en/ar dictionaries, signal service, pipe), auth (api, mock, http, store, guards),
               http (interceptor), navigation (per-role nav config)
  shared/      reusable standalone components
  layouts/     public layout, workspace layout (role-aware)
  features/    public, auth (login), workspace (role home), researcher|company|judge|admin (lazy routes)
src/styles/    tokens (from the logo), base, forms
```

## Conventions
* **Logical CSS only** (`margin-inline-start`, `inset-inline-end`, `text-align: start`). Bootstrap is loaded
  as grid + utilities only; do **not** use its physical helpers (`ms-*`, `me-*`, `text-start`, `float-*`).
* Directional icons get `class="icon-flip"`.
* All UI text goes through `TranslationKey`; `ar.ts` is typed against `en.ts`, so a missing key fails the build.
* Add a nav item only together with its page (`core/navigation/nav.config.ts`).
* Guards are UX. Every protected resource must be authorized by the API.

## Logo
`public/brand/luxor-university-logo.png` is a **crop of the supplied screenshot (145×250, unmodified pixels)**.
Replace it with the original high-resolution/transparent asset (keep the filename, update width/height in
`brand-logo.component.ts` if the aspect ratio changes).

## Progress
See `docs/REQUIREMENTS_CHECKLIST.md`.
