# Frontend Architecture & Changelog

This document outlines the architectural patterns, industry standards, and recent structural changes implemented in the React frontend.

## 🏗 Directory Structure

To keep the codebase maintainable and avoid "config hell", the `src` directory has been modularized:

- `/src/app/` - Contains core app initialization, global providers (`QueryClient`, `BrowserRouter`), and route definitions (`App.tsx`).
- `/src/styles/` - Contains global stylesheets (`globals.css`).
- `/src/components/` - Contains shared UI components (e.g., Shadcn primitives).
- `/src/pages/` - Contains top-level route views.
- `/src/hooks/` - Contains React Query data hooks.
- `/src/services/api/` - Contains isolated API call definitions.

*Note: Visual file nesting is enabled for VS Code. Config files like `tailwind.config.js` and `vite.config.ts` are nested under `package.json` in the File Explorer.*

## 🚀 Architectural Standards Implemented

### 1. State Management (React Query)
- **Standard**: Manual `useState`/`useEffect` chains are removed for external data.
- **Implementation**: `@tanstack/react-query` handles caching, loading states, error handling, and background refetches. All API calls are encapsulated inside custom hooks (`useHealthCheck`, `useUpdateAccount`).

### 2. Import Pathing
- **Standard**: Absolute pathing is strictly enforced.
- **Implementation**: Imports use `@/*` to reference the `src` directory (e.g., `import { Button } from "@/components/ui/Button"`). This prevents nested relative path (`../../`) breakage during refactors.

### 3. Code Splitting & Performance
- **Standard**: Route-level code splitting ensures optimal initial load speeds.
- **Implementation**: Top-level routes (`Home`, `Dashboard`, `Playground`) are loaded dynamically using `React.lazy()` and wrapped in a `<Suspense>` boundary. This avoids blocking the main thread and cleared the Vite 500kb chunk size warning.

### 4. SPA Routing Integrity
- **Standard**: Internal navigation must not trigger full-page reloads.
- **Implementation**: The reusable `<Button>` component intelligently detects external links (`http`, `mailto`) vs. internal routes, correctly rendering an `<a>` tag or a React Router `<Link>` respectively.

### 5. Mobile & UI Responsiveness
- **Implementation**: Native layout fixes have been applied to ensure `sticky` headers function correctly in the root layout pane, and `sonner` toast notifications are safely positioned to avoid notch-cropping and layout collisions on smaller screens. 

## 🔜 Upcoming Features (Roadmap)
- **Authentication**: Intended integration with **Clerk** to handle secure JWT handshakes, protected routes, and session reactivity safely without relying manually on `localStorage` boundaries.