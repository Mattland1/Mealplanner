# Architecture

## Current release

The application is a local-first React PWA with a small Fastify/SQLite home server.
The application shell is cached by a service worker and household data is stored in
IndexedDB before any network request. The domain model and shopping-list generator
have no dependency on React, HTTP, or either database.

```text
src/domain       entities and deterministic business rules
src/data         IndexedDB repository and seed data
src/data/sync    optimistic online synchronization
src/App.tsx      feature UI and application state orchestration
server           Fastify API and SQLite persistence
public           installable-app assets
```

The generated shopping list is a persisted snapshot. Regeneration reconciles it with
the current plan and deliberately retains checked generated entries and manual items.

The home inbox is server-backed rather than local-first. Its metadata is stored in the
`inbox_entries` SQLite table and attachments are written to the `inbox` directory next
to the database. This keeps arbitrary uploads out of the synchronized application-state
snapshot and makes deleting an inbox item remove both its metadata and attachment.

## Synchronization

The browser and server exchange a versioned state snapshot. Writes include the last
observed server revision. A stale revision receives HTTP 409; the client re-reads and
uses the newest `updatedAt` value. Synchronization runs after local changes and after
connectivity returns. A missing server never blocks local writes.

This snapshot protocol is deliberately small for a single household. If frequent
simultaneous editing becomes important, the next migration is an IndexedDB outbox of
idempotent per-item commands plus deletion tombstones.

## Authentication and transport

When `SAVOR_PASSWORD` is configured, state endpoints require a signed, HTTP-only,
SameSite=Strict session cookie. Sessions expire after 30 days. The server stores no
password or session in the browser's JavaScript-accessible storage. Login status and
logout are separate API endpoints; authentication never gates access to the device's
already-cached offline list.

The default Docker deployment publishes the application directly on port 4173 for a
trusted home network. Authentication remains available but is disabled by default,
because a password sent over plain HTTP would not be encrypted. HTTPS can be added
later without changing the application or synchronization protocol.

Background Sync is not required for correctness. The app must always remain usable
when that browser feature is absent.

## Data safety

Browser storage can be evicted by the operating system. Backup/restore is therefore
part of the release. SQLite is the shared authoritative copy and should be backed up
independently; IndexedDB remains the offline working copy.

## Deliberate limitations

- One active plan and one household per server.
- Conflict resolution is whole-state, last-modified-wins rather than per item.
- Only weight and volume units are automatically converted.
- Recipe editing is not included yet; recipes can be added and removed.
- Inbox submissions must be made while the home server is reachable.
- Native mobile Share-menu integration is not included; it requires an installed HTTPS PWA.
- The week label currently represents the device's current week.

These are feature boundaries, not domain-model limitations.
