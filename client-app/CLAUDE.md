# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start Vite dev server
npm run build        # Production build
npm run lint         # ESLint
npm run test         # Run Vitest unit tests (watch mode)
npm run ui-tests     # Run Playwright E2E tests
npm run preview      # Preview production build
npm run server       # Start backend server
```

Run a single unit test file:
```bash
npx vitest run src/components/login/Login.test.jsx
```

## Architecture

**Tech stack:** React 19, React Router 7, Vite 6, Tailwind CSS 4, Material-UI 7, Vitest + React Testing Library (unit), Playwright (E2E).

**Backend:** The app connects to a REST API at `http://localhost:3030` (SoftUni's `json-server` variant). Collections live at `/data/posts`, `/data/comments`, `/data/likes`. Auth endpoints are at `/users/login` and `/users/register`. No `.env` file — the base URL is hardcoded in the API files.

### Data flow

```
Component → API hook (src/api/) → useAuth() → request.js (fetch wrapper)
                                                      ↓
                                         Adds X-Authorization header
                                         if accessToken present
```

### Authentication

- `usePersistedState('auth', {})` in `UserProvider.jsx` stores auth data in `localStorage`.
- `UserContext` (defined in `src/contexts/UserContext.jsx`) exposes `{ _id, email, username, accessToken, userLoginHandler, userLogoutHandler }` to the entire app.
- `useAuth()` (`src/hooks/useAuth.js`) reads the context and returns `{ accessToken, email, userId, isAuthenticated, username, request }` — where `request` is the pre-authorized HTTP client.
- Route protection: `AuthGuard` redirects unauthenticated users to `/login`; `GuestGuard` redirects authenticated users away from login/register.

### API layer (`src/api/`)

Each file exports custom hooks that call the backend. They use `useAuth()` for the authorized `request` object. Key patterns:
- `postApi.js` — hooks for CRUD on posts and the `/data/likes` collection.
- `commentApi.js` — hooks for comments + reactions; uses `useReducer` with `commentsReducer` for local state.
- `authApi.js` — `useLogin` and `useRegister`.

### Routing (`src/App.jsx`)

`App.jsx` defines all routes inside `<UserProvider>`. The Admin component is lazy-loaded with `React.lazy` + `<Suspense>`. Toast notifications are globally available via `<ToastContainer>`.

### Testing conventions

Unit tests sit alongside components (`Component.test.jsx`). Mocks are declared with `vi.hoisted()` + `vi.mock()`. Tests use `MemoryRouter` for routing context. The Vitest config globs `src/components/**/*.test.jsx`.

Playwright E2E tests are in `tests/` and target Chromium only.
