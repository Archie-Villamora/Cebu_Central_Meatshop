# Cebu Central Meatshop — Full Infrastructure & Architecture Walkthrough

## 1. High-Level Overview

This is a **full-stack e-commerce scaffold** for a meat shop, built as a **monorepo with two independent apps** and a shared infrastructure folder:

```mermaid
graph TD
    subgraph Monorepo["Cebu_Central_Meatshop (Root)"]
        FE["frontend/\n(React SPA)"]
        BE["backend/\n(Express API)"]
        INFRA["infrastructure/\n(Docker)"]
    end

    FE -- "HTTP (Axios)\nport 3000 → 5000" --> BE
    BE -- "SQL" --> PG["PostgreSQL\n(planned)"]
    BE -- "S3 API" --> MINIO["MinIO\n(planned)"]
    INFRA -- "docker compose" --> PG
    INFRA -- "docker compose" --> MINIO
    CLERK["Clerk (SaaS)\nAuth Provider"] -- "JWT tokens" --> FE
    CLERK -- "JWT verification" --> BE
```

| Layer | Tech | Port | Status |
|-------|------|------|--------|
| Frontend | React 18 + Vite 8 + TailwindCSS 4 | `3000` | ✅ Running |
| Backend | Express 4 + TypeScript | `5000` | ✅ Running |
| Auth | Clerk (both sides) | SaaS | ✅ Wired |
| Database | PostgreSQL (via Docker) | `5432` | ⚠️ Configured in `.env`, no Docker yet |
| Object Storage | MinIO (via Docker) | `9000` | ⚠️ Configured in `.env`, no Docker yet |
| Docker | `docker-compose.yml` placeholder | — | ❌ Empty file |

---

## 2. Repository Structure

```
.
├── package.json                    # Root — shared deps (Clerk, TanStack Query, Framer Motion)
├── frontend/
│   ├── index.html                  # Vite entry HTML (Google Fonts preloaded)
│   ├── vite.config.ts              # Vite dev server on :3000, @ alias → ./src
│   ├── tailwind.config.js          # TW v4, shadcn theme tokens, Inter + Plus Jakarta Sans
│   ├── postcss.config.js           # @tailwindcss/postcss + autoprefixer
│   ├── components.json             # shadcn/ui config (slate base, CSS variables)
│   ├── tsconfig.json               # Strict TS, paths alias
│   ├── .env                        # VITE_API_URL, VITE_CLERK_PUBLISHABLE_KEY
│   └── src/
│       ├── index.tsx               # ReactDOM.createRoot entry
│       ├── app/App.tsx             # Router + providers + lazy routes
│       ├── layouts/RootLayout.tsx  # Header/nav shell + Footer + <Outlet>
│       ├── pages/                  # 15 route-level pages (most are stubs)
│       ├── components/
│       │   ├── ui/                 # 16 shadcn-style primitives
│       │   └── layout/Footer.tsx   # Full footer with sitemap links
│       ├── hooks/                  # useHealth, useAccount (TanStack Query)
│       ├── services/api/           # Axios client + health.ts + account.ts
│       ├── lib/utils.ts            # cn() helper (clsx + tailwind-merge)
│       ├── styles/globals.css      # Design tokens (60-30-10 color system)
│       └── assets/                 # CCM_logo.png + .webp
│
├── backend/
│   ├── tsconfig.json               # CommonJS target, strict mode
│   ├── .env                        # PORT, DATABASE_URL, MINIO_*, CLERK keys
│   └── src/
│       ├── server.ts               # dotenv.config() → app.listen(:5000)
│       └── app.ts                  # Express app: cors, json, Clerk middleware, 2 routes
│
└── infrastructure/
    └── docker/
        └── docker-compose.yml      # Empty — needs PostgreSQL + MinIO services
```

---

## 3. Frontend Architecture (Deep Dive)

### 3.1 Build Toolchain

| Tool | Version | Role |
|------|---------|------|
| Vite | 8.x | Dev server + HMR + bundler (`frontend/vite.config.ts`) |
| TypeScript | 5.3 | Type safety |
| TailwindCSS | 4.3 | Utility-first CSS via `@tailwindcss/postcss` (`frontend/tailwind.config.js`) |
| PostCSS | 8.x | CSS pipeline (`@tailwindcss/postcss` + autoprefixer) |

Vite is configured with the `@` path alias pointing to `./src`, and the dev server runs on port `3000`.

### 3.2 Provider Stack & Boot Sequence

The app boots through this provider hierarchy (see `frontend/src/app/App.tsx`):

```mermaid
graph TD
    A["ReactDOM.createRoot"] --> B["<React.StrictMode>"]
    B --> C["<QueryClientProvider>"]
    C --> D["<BrowserRouter>"]
    D --> E["<ClerkWithRoutes>"]
    E --> F["<ClerkProvider>"]
    F --> G["<Routes>"]
    G --> H["<RootLayout> (layout route)"]
    H --> I["Page Components"]
    C --> J["<ReactQueryDevtools>"]
    D --> K["<Toaster> (sonner)"]
```

Key design decisions:
- **ClerkProvider is inside BrowserRouter** — This is intentional. Clerk needs `useNavigate()` for its `routerPush`/`routerReplace` callbacks, so a `ClerkWithRoutes` wrapper component bridges the two.
- **QueryClient is at the top** — All routes and Clerk hooks can use TanStack Query.
- **All page routes are lazy-loaded** with `React.lazy()` + `Suspense` fallbacks — good for code-splitting.

### 3.3 Routing & Pages

Routes are defined in `frontend/src/app/App.tsx`. All routes are nested under a `<RootLayout>` layout route:

| Route | Component | Auth Required | Status |
|-------|-----------|:---:|--------|
| `/` | `pages/Home.tsx` | ❌ | ✅ Fully built |
| `/shop` | `pages/shop/Shop.tsx` | ❌ | 🟡 Stub |
| `/shop/:category` | `pages/shop/Category.tsx` | ❌ | 🟡 Stub |
| `/shop/product/:id` | `pages/shop/ProductDetail.tsx` | ❌ | 🟡 Stub |
| `/bundles` | `pages/shop/Bundles.tsx` | ❌ | 🟡 Stub |
| `/our-story` | `pages/about/OurStory.tsx` | ❌ | 🟡 Stub |
| `/sourcing` | `pages/about/Sourcing.tsx` | ❌ | 🟡 Stub |
| `/wholesale` | `pages/services/Wholesale.tsx` | ❌ | 🟡 Stub |
| `/subscription` | `pages/services/Subscription.tsx` | ❌ | 🟡 Stub |
| `/shipping` | `pages/support/Shipping.tsx` | ❌ | 🟡 Stub |
| `/guarantee` | `pages/support/Guarantee.tsx` | ❌ | 🟡 Stub |
| `/faq` | `pages/support/FAQ.tsx` | ❌ | 🟡 Stub |
| `/terms` | `pages/legal/Terms.tsx` | ❌ | 🟡 Stub |
| `/privacy` | `pages/legal/Privacy.tsx` | ❌ | 🟡 Stub |
| `/account` | `pages/account/CustomerHub.tsx` | ✅ | 🟡 Stub |

> **Note:** The `/account` route is the **only protected route**. It uses a `ProtectedRoute` wrapper that renders `<SignedIn>` children or redirects to sign-in via `<RedirectToSignIn />`.

### 3.4 Authentication Flow (Clerk)

```mermaid
sequenceDiagram
    participant User
    participant Frontend as React App
    participant Clerk as Clerk SaaS
    participant Backend as Express API

    User->>Frontend: Visits /account
    Frontend->>Frontend: ProtectedRoute checks <SignedIn>
    alt Not signed in
        Frontend->>Clerk: RedirectToSignIn (modal)
        Clerk->>Frontend: Returns JWT session token
    end
    Frontend->>Frontend: Axios interceptor calls window.Clerk.session.getToken()
    Frontend->>Backend: GET /api/account (Authorization: Bearer <token>)
    Backend->>Backend: clerkMiddleware() verifies JWT
    Backend->>Backend: requireAuth() checks req.auth.userId
    Backend->>Frontend: 200 { userId: "user_xxx" }
```

**Frontend side** (`frontend/src/services/api/axios.ts`):
- Axios request interceptor automatically attaches the Clerk session token to every API request
- Falls back to `localStorage.getItem('token')` if Clerk isn't loaded (legacy/SSR)

**Backend side** (`backend/src/app.ts`):
- `clerkMiddleware()` is applied **globally** — parses JWT on every request
- `requireAuth()` is applied **per-route** — only `/api/account` enforces authentication
- `/api/health` is public (no `requireAuth()`)

### 3.5 Data Fetching Layer

```mermaid
graph LR
    A["React Component"] --> B["Custom Hook\n(useHealth, useAccount)"]
    B --> C["TanStack React Query\n(useQuery / useMutation)"]
    C --> D["Service Function\n(services/api/*.ts)"]
    D --> E["Axios apiClient\n(with Clerk interceptor)"]
    E --> F["Express Backend\nhttp://localhost:5000/api"]
```

| Hook | Query Type | API Endpoint | Notes |
|------|-----------|-------------|-------|
| `useHealthCheck` (`hooks/useHealth.ts`) | `useQuery` | `GET /api/health` | Retry: 1 |
| `useUpdateAccount` (`hooks/useAccount.ts`) | `useMutation` | (simulated) | `setTimeout` mock, no real API call yet |

> **Warning:** The `updateAccount` service (`services/api/account.ts`) is currently a **mock** — it uses `setTimeout` to simulate a 1.5s API call and returns static data. It doesn't use the Axios client at all.

### 3.6 Design System & UI Components

> [!NOTE]
> For complete specifications, typography configurations, interactive micro-animations, layout responsiveness guidelines, and a detailed primitive API catalog, refer directly to the [Design System & UI Components.md](file:///c:/Users/User/Desktop/webdev/Cebu_Central_Meatshop/Design%20System%20&%20UI%20Components.md) document at the root of the project.

#### Color System (`frontend/src/styles/globals.css`)

Uses a **60-30-10 color rule** with HSL CSS variables:

| Role | Token | Light Value | Description |
|------|-------|-------------|-------------|
| 60% Background | `--background` | `0 0% 98.4%` | Gallery White (#FBFBFB) |
| 30% Secondary | `--secondary` | `210 7.1% 11%` | Cast Iron (#1A1C1E) |
| 10% Primary/CTA | `--primary` | `350 85.2% 42.4%` | Prime Cut Red (#C8102E) |

**Dark mode** is supported via the `.dark` class (class-based toggle, configured in Tailwind).

#### Typography
- **Body**: Inter (400, 500, 600)
- **Display/Headings**: Plus Jakarta Sans (500, 600, 700)
- Loaded via Google Fonts preconnect in `frontend/index.html`

#### UI Component Library (16 components in `components/ui/`)

All built in the **shadcn/ui** pattern — copy-paste primitives using Radix UI + CVA + tailwind-merge:

| Component | Based On | File |
|-----------|----------|------|
| Button | CVA variants | `components/ui/Button.tsx` |
| Dialog | Radix Dialog | `components/ui/Dialog.tsx` |
| Sheet | Radix Dialog | `components/ui/Sheet.tsx` |
| DropdownMenu | Radix Dropdown | `components/ui/DropdownMenu.tsx` |
| Input | Custom + error states | `components/ui/Input.tsx` |
| Card | Composable slots | `components/ui/Card.tsx` |
| Alert | Variant-based | `components/ui/Alert.tsx` |
| Toaster | Sonner | `components/ui/Toaster.tsx` |
| FadeIn | Framer Motion | `components/ui/FadeIn.tsx` |
| Skeleton, Spinner, Badge, Label, Checkbox, Textarea, EmptyState | Various | `components/ui/` |

### 3.7 Layout System

The `RootLayout` (`frontend/src/layouts/RootLayout.tsx`) provides the app shell:

```
┌────────────────────────────────────────────┐
│  Header (sticky, backdrop-blur)            │
│  ┌──────────┬──────────────┬─────────────┐ │
│  │ Logo     │  Nav Links   │ Auth/User   │ │
│  │ (mobile: │  (desktop)   │ (desktop)   │ │
│  │  burger) │              │             │ │
│  └──────────┴──────────────┴─────────────┘ │
├────────────────────────────────────────────┤
│  <Outlet /> (page content)                 │
│                                            │
├────────────────────────────────────────────┤
│  Footer (4-column sitemap + socials)       │
└────────────────────────────────────────────┘
```

- **Mobile nav**: Uses a `Sheet` (Radix dialog slide-in) with a creative vertical "Close" tab
- **Active tab indicator**: Framer Motion `layoutId` animation on both desktop and mobile nav
- **Responsive**: Mobile hamburger < `md`, desktop nav ≥ `md`

---

## 4. Backend Architecture (Deep Dive)

### 4.1 Entry Point

`backend/src/server.ts` → loads `.env` via `dotenv`, imports the Express app, listens on `PORT` (default 5000).

### 4.2 Express App Configuration

`backend/src/app.ts` sets up:

```
cors()                      → Allows all origins (wide open — needs lockdown for prod)
express.json()              → JSON body parsing
clerkMiddleware()           → Global JWT parsing (doesn't enforce auth)
```

### 4.3 API Endpoints

| Method | Path | Auth | Response |
|--------|------|------|----------|
| `GET` | `/api/health` | Public | `{ status: "ok", message: "Backend is running" }` |
| `GET` | `/api/account` | `requireAuth()` | `{ status: "ok", userId: "..." }` |

> **Important:** The backend is **extremely minimal** right now — just 2 endpoints. There are no:
> - Database models or ORM (Prisma, Knex, etc.)
> - Service layer
> - Controllers (planned folder structure exists)
> - File upload handling (MinIO configured in `.env` but not wired)
> - Error handling middleware
> - Rate limiting or input validation

### 4.4 Development Runner

```bash
ts-node-dev --respawn --transpile-only src/server.ts
```
- **`--respawn`**: Auto-restarts on file changes (HMR for backend)
- **`--transpile-only`**: Skips type-checking for speed (relies on IDE for TS errors)

---

## 5. Infrastructure Layer

### 5.1 Docker (Planned)

`infrastructure/docker/docker-compose.yml` exists but is **empty**. Based on the `.env` configuration, it's intended to have:

| Service | Image | Port | Purpose |
|---------|-------|------|---------|
| PostgreSQL | `postgres:16` | `5432` | Relational data (users, orders, products) |
| MinIO | `minio/minio` | `9000` / `9001` | Object storage (product images, uploads) |

**Backend `.env` already defines:**
```
DATABASE_URL=postgres://user:password@localhost:5432/mydb
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
MINIO_BUCKET_NAME=mybucket
```

### 5.2 Environment Variables

| File | Variables | Notes |
|------|-----------|-------|
| `frontend/.env` | `VITE_API_URL`, `VITE_CLERK_PUBLISHABLE_KEY` | Vite-prefixed for client exposure |
| `backend/.env` | `PORT`, `DATABASE_URL`, `MINIO_*`, `CLERK_SECRET_KEY`, `CLERK_PUBLISHABLE_KEY` | Server-side only |

> **Caution — Security concern**: The `backend/.env` file contains real Clerk test keys (`sk_test_...`). Ensure `.env` files are in `.gitignore` (they are). If this repo is ever made public, rotate those keys.

---

## 6. How Data Flows End-to-End

```mermaid
sequenceDiagram
    participant Browser
    participant Vite as Vite Dev Server (:3000)
    participant React as React App
    participant Axios as Axios + Interceptor
    participant Express as Express API (:5000)
    participant Clerk as Clerk Cloud

    Browser->>Vite: GET http://localhost:3000
    Vite->>Browser: index.html + JS bundles (HMR)
    Browser->>React: React hydrates, ClerkProvider initializes
    React->>Clerk: Fetch session (if signed in)
    Clerk->>React: JWT token

    Note over React: User navigates to page
    React->>Axios: API call (e.g., healthCheck)
    Axios->>Axios: Interceptor attaches Bearer token
    Axios->>Express: GET /api/health (Authorization: Bearer ...)
    Express->>Express: clerkMiddleware() parses JWT
    Express->>Browser: { status: "ok" }

    Note over React: Protected route (e.g., /account)
    React->>Express: GET /api/account
    Express->>Express: requireAuth() checks auth
    alt Authenticated
        Express->>Browser: { userId: "user_xxx" }
    else Not authenticated
        Express->>Browser: 401 Unauthorized
    end
```

---

## 7. Form Handling Pattern

The `Dashboard` page (`frontend/src/pages/Dashboard.tsx`) demonstrates the form stack:

```
react-hook-form (form state)
    → zod (validation schema)
    → useMutation (TanStack Query)
    → toast.promise (sonner notifications)
```

This is a well-established pattern: Zod schemas validate, react-hook-form manages state, mutations handle async, and Sonner provides loading/success/error toasts in one call.

---

## 8. Project Maturity Assessment

### ✅ What's Done Well
- **Provider architecture** is properly layered (Query → Router → Auth → Layout)
- **Auth** is fully wired end-to-end (Clerk on both frontend and backend)
- **Design system** follows the 60-30-10 rule with proper token architecture
- **Code splitting** via lazy routes with Suspense boundaries
- **Component library** has 16 production-quality shadcn primitives
- **Home page** is fully built with hero carousel, categories, products, and promo banner
- **Responsive layout** with mobile sheet nav and desktop nav bar
- **Form validation** pattern (Zod + react-hook-form + TanStack Query) is established

### ⚠️ What's Missing / Needs Work

| Area | Gap | Priority |
|------|-----|----------|
| **Docker** | `docker-compose.yml` is empty — no Postgres or MinIO running | 🔴 High |
| **Database** | No ORM, no models, no migrations | 🔴 High |
| **API endpoints** | Only 2 routes (health + account) — no product/order/cart APIs | 🔴 High |
| **Backend structure** | Planned folders (controllers, services, models, routes) are not created | 🟡 Medium |
| **13 stub pages** | Shop, Category, Bundles, etc. are all one-line placeholders | 🟡 Medium |
| **Cart/Checkout** | No cart state management or checkout flow | 🟡 Medium |
| **MinIO integration** | Configured but not wired — no file upload logic | 🟡 Medium |
| **Error boundaries** | No React error boundary for graceful crash handling | 🟡 Medium |
| **CORS lockdown** | `cors()` allows all origins — needs whitelisting for production | 🟡 Medium |
| **Input validation** | Backend has no body validation middleware (e.g., Zod/Joi) | 🟡 Medium |
| **Testing** | No test framework, no test files | 🟡 Medium |
| **CI/CD** | No GitHub Actions or deployment pipeline | 🔵 Low |
| **SEO** | Single `<title>` tag, no per-page meta/OG tags | 🔵 Low |
| **Dark mode toggle** | CSS variables defined but no UI toggle exists | 🔵 Low |

---

## 9. Dependency Map

### Frontend (`frontend/package.json`)

| Category | Packages |
|----------|----------|
| **Core** | `react`, `react-dom` (18.x) |
| **Routing** | `react-router-dom` (6.x) |
| **Auth** | `@clerk/clerk-react` |
| **Data Fetching** | `@tanstack/react-query`, `@tanstack/react-query-devtools`, `axios` |
| **UI Primitives** | `@radix-ui/react-dialog`, `@radix-ui/react-dropdown-menu`, `@radix-ui/react-slot` |
| **Styling** | `tailwindcss` (4.x), `class-variance-authority`, `clsx`, `tailwind-merge` |
| **Forms** | `react-hook-form`, `@hookform/resolvers`, `zod` |
| **Animations** | `framer-motion` (12.x) |
| **Notifications** | `sonner` |
| **Icons** | `lucide-react` |

### Backend (`backend/package.json`)

| Category | Packages |
|----------|----------|
| **Core** | `express` (4.x) |
| **Auth** | `@clerk/express` |
| **Config** | `dotenv` |
| **CORS** | `cors` |
| **Dev** | `ts-node-dev`, `typescript` (5.x) |

> **Tip:** The backend is intentionally lightweight right now. When you add database support, you'll likely want to add `pg` (or Prisma), and for MinIO you'll need the `minio` SDK package.
