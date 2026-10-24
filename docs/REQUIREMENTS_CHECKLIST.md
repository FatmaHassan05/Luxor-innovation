# Requirements checklist (living document)

Source: *MVP Feature Coverage* requirements text supplied with the brief.
**The scope PDF itself has not been provided yet** – every row must be re-verified against it.

Status legend: ✅ done · 🟡 partial / mock-only · ⬜ planned · 🚫 out of scope (must NOT be built) · 🔒 needs backend

## Phase 1 – Foundation (this delivery)

| ID | Requirement | Where | Status |
|----|-------------|-------|--------|
| F-1 | Angular 21 standalone, signals, lazy routes | `app.routes.ts`, role `*.routes.ts` | ✅ (uncompiled*) |
| F-2 | PrimeNG themed to the logo | `luxor-theme.ts`, `app.config.ts` | ✅ (uncompiled*) |
| F-3 | Bootstrap grid (RTL-safe subset) | `angular.json`, `home.page.ts` | ✅ (grid only) |
| F-4 | Almarai (AR) + IBM Plex Sans (EN) | `angular.json` styles, `_tokens.scss` | ✅ |
| F-5 | Design tokens from logo | `styles/_tokens.scss` | ✅ |
| F-6 | AR RTL / EN LTR switch, logical CSS | `I18nService`, `LanguageSwitcher` | ✅ |
| F-7 | Mock services behind interfaces | `AuthApi` → `MockAuthApi` / `HttpAuthApi` | ✅ |
| F-8 | Route guards + role-aware nav | `auth.guards.ts`, `nav.config.ts` | 🟡 UX only; 🔒 real authorization |
| F-9 | Shared components: logo, header, footer, alert, status badge, page header, empty state | `shared/components` | ✅ |
| F-10 | Four statuses, no others | `models/status.ts`, `StatusBadge` | ✅ |

## Public site & visitor (scope §1)

| ID | Requirement | Planned screen/component | Phase | Status |
|----|-------------|--------------------------|-------|--------|
| PUB-1 | Landing page explaining the platform | `features/public/home` (stub today) | 2 | 🟡 stub |
| PUB-2 | AR/EN, 375px, Almarai, logo | header, tokens | 1–2 | ✅ foundation |
| PUB-3 | Entry points: submit innovation / submit challenge | landing | 2 | ⬜ |
| PUB-4 | Separate researcher / company login entries | landing + header menu | 1 | ✅ |
| PUB-5 | Browse public innovation briefs + detail | `/innovations`, `/innovations/:id` | 2 | ⬜ |
| PUB-6 | Browse public challenge briefs + detail | `/challenges`, `/challenges/:id` | 2 | ⬜ |
| PUB-7 | CTAs send unauthenticated users to register/login | landing, detail pages | 2 | ⬜ |
| PUB-8 | Public pages never expose private data | public DTOs separate from private models | 2 | ⬜ 🔒 |

## Authentication (scope §2)

| ID | Requirement | Where | Phase | Status |
|----|-------------|-------|-------|--------|
| AUTH-1 | Separate login pages ×4 | `/researcher|company|judge|admin/login` | 1 | ✅ mock |
| AUTH-2 | Researcher / company self-registration, instant activation | register pages; API method exists | 2 | 🟡 API+mock only |
| AUTH-3 | No public Judge/Admin registration | no such routes; `SelfRegisterRole` type | 1 | ✅ |
| AUTH-4 | Post-login redirect per role | `ROLE_HOME`, `LoginPage` | 1 | ✅ (targets are stubs) |
| AUTH-5 | Logout | header + workspace layout | 1 | ✅ |
| AUTH-6 | Session persistence until logout/timeout | `AuthStore` (expiry check) | 1 | 🟡 mock; 🔒 real |
| AUTH-7 | One generic login error | `LoginPage`, `AuthError` | 1 | ✅ |
| AUTH-8 | Real authN/authZ | ASP.NET Core | – | 🔒 |
| AUTH-9 | Session-expired feedback | `sessionExpired` + login alert | 1 | ✅ |

## Researcher (§3) · Company (§4)

| ID | Requirement | Phase | Status |
|----|-------------|-------|--------|
| RES-1 | Innovation form: title, short description, category, expected benefit, researcher name, faculty/department, contact email | 3 | ⬜ |
| RES-2 | Categories: Technical, Industrial, Agricultural, Commercial, Medical, Other | 3 | ⬜ |
| RES-3 | Separate optional public brief (~50–100 words), visually distinct from private data | 3 | ⬜ |
| RES-4 | Multiple attachments, type/size validation, remove before submit, progress, errors | 3 | ⬜ (limits from config, not invented) |
| RES-5 | Submissions list, detail, current status, notifications | 3 | ⬜ |
| RES-6 | Initial status New, owner-scoped | 3 + 🔒 | ⬜ |
| COM-1 | Challenge form: title, description, category, organization, contact name, contact email, expected outcome | 3 | ⬜ |
| COM-2 | Attachments, list, detail, status, notifications | 3 | ⬜ |
| DYN-R | Render admin-configured fields dynamically in both forms | 3 (render) / 5 (editor) | ⬜ |

## Viewer/Judge (§6) · Notifications (§7)

| ID | Requirement | Phase | Status |
|----|-------------|-------|--------|
| JDG-1 | Browse public innovation + challenge briefs | 4 | ⬜ |
| JDG-2 | Side-by-side comparison, manual match record | 4 | ⬜ |
| JDG-3 | Private evaluation notes (Judge + Admin only) | 4 | ⬜ 🔒 |
| JDG-4 | Previous evaluations/matches | 4 | ⬜ |
| NOT-1 | Confirm-then-send internal interest notification to both parties | 4 | ⬜ |
| NOT-2 | Notification list for researchers and companies | 3–4 | ⬜ |
| NOT-3 | Success and failure states; never claim sent on failure | 4 | ⬜ |

## Admin (§5, §8, §9)

| ID | Requirement | Phase | Status |
|----|-------------|-------|--------|
| ADM-1 | Submissions overview (innovation vs challenge identifiable), details, attachments | 5 | ⬜ |
| ADM-2 | Status update New → Under Review → Accepted/Rejected, optional rejection reason | 5 | ⬜ |
| ADM-3 | User list; create Viewer/Judge accounts; **no delete** | 5 | ⬜ |
| ADM-4 | Dynamic form editor: text + choice only, required flag, save, preview, per-form | 5 | ⬜ |

## Cross-cutting (§10–§13)

| ID | Requirement | Status |
|----|-------------|--------|
| X-1 | Permission matrix at route + service level | 🟡 routes done for 4 roles; services in later phases |
| X-2 | Direct-URL access to private records blocked | 🔒 backend |
| X-3 | Responsive down to 375px, AR + EN checked | 🟡 foundation built; formal check in Phase 6 |
| X-4 | Accessibility basics (skip link, labels, focus, reduced motion) | ✅ foundation |
| X-5 | Excluded features absent (AI matching, email/SMS, chat, payments, analytics, user deletion…) | ✅ none present |

\* Written without being able to run `npm install` / `ng build` in the authoring sandbox.
