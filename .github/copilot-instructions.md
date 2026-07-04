# FE_ELearning Project Guidelines

## Tech Stack
- React 19 + Vite 7 (JavaScript, JSX; no TypeScript in current codebase).
- Routing: react-router-dom.
- Server state: @tanstack/react-query.
- Global client state: Zustand.
- HTTP client: axios via `src/lib/axiosClient.js`.
- UI: Tailwind CSS v4 + DaisyUI.
- Notifications: react-hot-toast.

## Build and Run
- Install dependencies: `npm install`
- Start dev server: `npm run dev`
- Lint: `npm run lint`
- Build production bundle: `npm run build`
- Preview build: `npm run preview`
- Testing: No test framework is configured yet. Do not assume Vitest/Jest exists unless added in-task.

## Environment
- API base URL depends on:
  - `VITE_MODE`
  - `VITE_SERVER_URL`
  - `VITE_LOCAL_URL`
- Keep environment handling compatible with `src/lib/axiosClient.js`.

## Architecture
- `src/api/`: Domain API calls. Keep function naming consistent with `*API` suffix.
- `src/hooks/`: React Query hooks and mutation orchestration.
- `src/store/`: Zustand stores for app-wide client state (auth, lesson UI state).
- `src/Pages/`: Route-level page components.
- `src/Components/`: Reusable UI components and feature-specific pieces.
- `src/lib/`: Shared utilities and client setup.

## Conventions
- Keep imports with explicit extensions (`.js`, `.jsx`) to match current style.
- Prefer function components and hooks over class components.
- For async server operations:
  - API call in `src/api/*`
  - Hook wrapper in `src/hooks/*` with `useQuery`/`useMutation`
  - Invalidate relevant query keys after successful mutations.
- Use react-hot-toast for user-visible success/error feedback in mutation handlers.
- Route protection should use wrappers in `src/Components/ProtectedRoutes.jsx` (`ProtectedRoute`, `AdminRoute`, `GuestRoute`).
- Auth state must remain synchronized through `useAuthStore` actions (`setAuth`, `setUser`, `logout`) instead of ad hoc localStorage writes.

## Data and Error Handling
- `axiosClient` response interceptor returns `response.data`; consumers should not expect full axios response objects.
- Request interceptor injects bearer token from localStorage if present.
- Use defensive access for API errors (`error.response?.data?.message`) before fallback messages.

## Editing Guidelines
- Preserve existing folder boundaries and naming patterns before introducing new structure.
- When adding new domains, mirror existing layout: `api/<domain>.js`, `hooks/use<Domain>.js`, then page/component integration.
- Prefer targeted changes over broad refactors unless explicitly requested.
