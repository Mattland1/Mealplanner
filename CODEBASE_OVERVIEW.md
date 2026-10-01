# Savor codebase overview

This guide is for making small changes without already knowing React, TypeScript,
Vite, Fastify, or browser storage. The shortest description of the application is:

> A React app runs in the browser and saves immediately to the browser's IndexedDB.
> When the home server is reachable, the entire household state is synchronized to
> a SQLite database. A small Fastify server also stores inbox items and attachments.

## Start here

For normal development, open two terminals in this directory:

```powershell
# Terminal 1: browser app, normally http://localhost:5173
pnpm dev

# Terminal 2: API and SQLite server, http://localhost:4173
pnpm dev:server
```

Vite forwards browser requests beginning with `/api` from port 5173 to the server
on port 4173. The app can still save locally if the API is unavailable, but sync,
authentication, and the inbox need the server.

Useful checks after a change:

```powershell
pnpm test
pnpm build
```

`pnpm build` is especially useful: TypeScript catches many mistakes before the app
runs. The production build is started with `pnpm start` and appears on port 4173.

## What lives where

```text
Mealplanner/
├─ src/                       Browser application (the code changed most often)
│  ├─ main.tsx                Browser entry point; starts React and the service worker
│  ├─ App.tsx                 Screens, dialogs, UI state, and app-level actions
│  ├─ styles.css              All visual styling and responsive layout
│  ├─ domain/
│  │  ├─ model.ts             Type definitions: Recipe, Ingredient, AppState, etc.
│  │  ├─ shoppingList.ts      Pure shopping-list generation rules
│  │  └─ id.ts                Unique ID creation
│  └─ data/
│     ├─ seed.ts              Starter recipes and catalogue migrations
│     ├─ repository.ts        Read/write browser IndexedDB; JSON backup/restore
│     ├─ sync.ts              Synchronize browser state with `/api/state`
│     ├─ auth.ts              Browser calls for login/logout/status
│     └─ inbox.ts             Browser calls for inbox items and files
├─ server/
│  ├─ index.ts                Fastify API, SQLite tables, inbox file handling
│  └─ auth.ts                 Optional password and signed session cookie
├─ public/                    Files copied as-is into the web build (currently icon.svg)
├─ docs/architecture.md       Short design notes and known limitations
├─ index.html                 HTML shell containing React's root element
├─ vite.config.ts             Dev proxy, PWA manifest, and offline asset caching
├─ package.json               Dependencies and `pnpm ...` commands
├─ tsconfig*.json             TypeScript settings for browser, tools, and server
├─ Dockerfile                 Builds the browser and server production bundles
├─ docker-compose.yml         Runs Savor and mounts its persistent Docker volume
├─ deploy.bat                 Windows shortcut for Docker Compose deployment
└─ .env.example               Optional server authentication settings
```

Folders that are outputs or live data, and should normally **not** be edited:

- `node_modules/` — installed JavaScript packages; recreated by `pnpm install`.
- `dist/` — generated production browser files; recreated by `pnpm build`.
- `server-dist/` — compiled server JavaScript; recreated by `pnpm build`.
- `data/savor.sqlite*` — live SQLite database files used outside Docker.
- `data/inbox/` — live uploaded inbox attachments used outside Docker.

In Docker, the database and inbox are in the named `savor-data` volume rather than
the repository's `data/` directory.

## How the pieces relate

```text
User action in App.tsx
        │
        ▼
React AppState in browser memory
        │
        ├── after 500 ms ──► IndexedDB via src/data/repository.ts
        │                         (always the first durable save)
        │
        └── when online ───► src/data/sync.ts ─► /api/state
                                                   │
                                                   ▼
                                      server/index.ts ─► SQLite
```

The synchronized value is one `AppState` object containing recipes, the current
meal plan, and the shopping list. It is not one SQL row per recipe. The server stores
the whole object as JSON in the `household_state.payload` column and uses a revision
number to detect competing writes.

The inbox is different: it is server-only. Its metadata has individual rows in
`inbox_entries`; uploaded files live under the data directory's `inbox/` folder.

## The browser app

### Entry and lifecycle

`src/main.tsx` mounts `<App />` into `index.html` and registers the PWA service worker.
The service worker caches the built application shell so it can reopen offline.

`src/App.tsx` is currently a large single-file UI. The `App` function:

1. Loads local `AppState` from IndexedDB.
2. Checks whether server authentication is enabled.
3. Holds the current screen and all application data in React state.
4. Saves changes locally, then tries to synchronize them.
5. Renders one of the Plan, Shop, Recipes, or Inbox views.
6. Opens dialogs for adding recipes, manual shopping items, inbox items, etc.

The most useful search terms in this file are:

- `function App` — application startup, state changes, and screen selection.
- `function PlanView` — choose recipes, servings, filters, and generate a list.
- `function ShopView` — check, uncheck, and add shopping-list items.
- `function RecipesView` — recipe library, filters, deletion, backup/restore.
- `function RecipeDetailsDialog` — full recipe display.
- `function RecipeDialog` — the add-recipe form.
- `function InboxView` / `InboxDialog` — home inbox display and submission.

### A small React/TypeScript translation for Python users

- `.ts` is TypeScript; `.tsx` is TypeScript that also contains HTML-like JSX.
- `interface Recipe { ... }` is similar to a typed Python dataclass definition, but
  it is checked at build time and does not exist as a runtime class.
- `const [state, setState] = useState(...)` stores UI state. Calling `setState`
  schedules a re-render.
- `useEffect(() => { ... }, [x])` runs a side effect after rendering when `x` changes.
- `{items.map(item => <Card ... />)}` is a loop that produces UI elements.
- `{condition && <Thing />}` conditionally renders an element.
- Props such as `<PlanView state={state} />` are function arguments for components.
- Object spread, `{ ...old, name: newName }`, copies an object and replaces fields;
  React code generally avoids changing existing state objects in place.
- `value?: string` means an optional value. `value ?? fallback` uses the fallback
  only when the value is `null` or `undefined`.

### Domain rules

`src/domain/model.ts` is the best first stop when a data shape is unclear. Its main
types are `Recipe`, `Ingredient`, `PlannedMeal`, `ShoppingListItem`, and `AppState`.
It also contains the allowed categories, units, collections, healthiness levels,
and time categories.

`src/domain/shoppingList.ts` is deliberately independent of React and storage. It:

- scales ingredient quantities to the planned serving count;
- ignores optional ingredients;
- merges ingredients with the same normalized name and compatible unit family;
- converts kg/g and l/ml;
- preserves checked generated items when regenerating; and
- preserves manually added shopping items.

Tests beside the domain files document expected behavior and can be run with
`pnpm test`.

## Recipes: where they really live

This distinction prevents the most common surprise:

| Recipe kind | Location | Best way to change it |
|---|---|---|
| A recipe added by a person | Browser IndexedDB, then synchronized SQLite state | Use the app UI |
| An existing saved household recipe | Browser IndexedDB and synchronized SQLite state | Use the Edit action in Recipes or the recipe-details view |
| Recipes offered to a brand-new installation | `src/data/seed.ts` | Edit code, test, and build |
| A starter-catalogue update for existing installations | `src/data/seed.ts`, especially `migrateRecipeCatalog` and `CATALOG_VERSION` | Write an explicit migration and increment the version |

### Adding a normal recipe

Use **Recipes → New recipe** (or **Plan → Add recipe**). This creates a unique ID,
updates the in-memory `AppState`, saves to IndexedDB, and synchronizes the state.
This is the safest route for household content and needs no code change.

Existing recipes can be edited from the pencil button in **Recipes**, or by opening
a recipe from the Plan screen and choosing **Edit recipe**. The edit form preserves
the recipe ID, so planned meals continue to reference the same recipe. Ingredients
can be removed and re-added in the form when their quantity, unit, or category needs
to change.

Do not edit `savor.sqlite` directly for recipe changes: recipes are nested inside a
JSON state snapshot, and a browser with a newer timestamp may overwrite the result.

### Adding a starter recipe in code

Starter recipe information is assembled in `src/data/seed.ts` from:

- `starterRecipeBasics` — identity, text, servings, ingredients, and collection;
- `starterMetadata` — tags, healthiness, and estimated nutrition;
- `starterInstructions` — ordered cooking steps;
- `starterTimes` — total minutes and derived time category; and
- `starterRecipes` — combines the sections above into complete recipes.

Use a stable, unique recipe ID and stable, unique ingredient IDs. Ingredient units
and categories must be values allowed by `src/domain/model.ts`. A recipe only appears
in existing saved states after `CATALOG_VERSION` is increased, because migrations are
skipped when a state already has the current version.

There is a second subtlety: the current migration generally keeps fields already
present in a saved recipe. Merely changing the name, description, or ingredients of
an existing starter in `starterRecipeBasics` does **not** reliably replace the saved
copy. Such a change needs explicit transformation code inside
`migrateRecipeCatalog`, followed by a `CATALOG_VERSION` increment and migration tests.

`src/data/seed.test.ts` covers catalogue migration behavior. Add or update a test
there whenever changing the starter catalogue or its migration.

## Common small changes

| Goal | Main file(s) |
|---|---|
| Change text, behavior, form fields, or a screen | `src/App.tsx` |
| Change colors, spacing, cards, mobile layout | `src/styles.css` |
| Add/change recipe fields or allowed values | `src/domain/model.ts`, then all TypeScript errors reported by `pnpm build` |
| Change how ingredients become a shopping list | `src/domain/shoppingList.ts` and its test |
| Change starter recipes | `src/data/seed.ts` and `src/data/seed.test.ts` |
| Change local backup or browser persistence | `src/data/repository.ts` |
| Change synchronization/conflict behavior | `src/data/sync.ts` and `server/index.ts` |
| Add or change an API endpoint | `server/index.ts` plus a matching file under `src/data/` |
| Change login/session behavior | `src/data/auth.ts` and `server/auth.ts` |
| Change install/offline metadata | `vite.config.ts` |
| Change production container/deployment | `Dockerfile`, `docker-compose.yml`, `deploy.bat` |

## Server and production flow

`server/index.ts` starts Fastify, creates the SQLite tables when needed, and provides:

- `GET /api/health` — health check;
- `/api/auth/*` — optional household login;
- `GET/PUT /api/state` — read and update the versioned `AppState` snapshot;
- `/api/inbox/*` — list, create, download, and delete inbox entries; and
- static serving of `dist/` in production, with `index.html` as the app fallback.

`pnpm build` performs three jobs: type-checks the browser, compiles the server into
`server-dist/`, and builds browser assets into `dist/`. The Dockerfile repeats that
build in a container, then runs `node server-dist/index.js`.

## Safe working habits

1. Export a backup before experiments that touch saved household data.
2. Make source changes under `src/` or `server/`, never in generated build folders.
3. Run `pnpm test` for domain/catalogue changes.
4. Run `pnpm build` before deploying; it checks both browser and server TypeScript.
5. Test recipe changes with a fresh browser profile as well as an existing profile:
   fresh and migrated states take different code paths.
6. After a production change, rebuild/restart with `deploy.bat` or
   `docker compose up --build -d`.

For the higher-level design decisions and current feature boundaries, continue with
[`docs/architecture.md`](docs/architecture.md).
