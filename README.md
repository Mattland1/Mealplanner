# Mealplanner

A mobile-first, local-first weekly meal planner, categorized shopping list, and home inbox.

## Run locally

```powershell
pnpm install
pnpm dev
```

Open the shown address in a browser. For phone testing on the same network, run
`pnpm dev --host` and use the computer's LAN address. Offline installation requires
HTTPS in production.

## Commands

- `pnpm dev` — start the development server
- `pnpm dev:server` — start the SQLite API during development
- `pnpm build` — type-check and create a production build
- `pnpm start` — serve the production PWA and API on port 4173
- `pnpm test` — run the domain tests
- `pnpm preview` — preview the production build

Data is written to IndexedDB first, then synchronized to `data/savor.sqlite` whenever
the home server is reachable. The shopping list therefore remains available away from
the home network. JSON backup and restore are also included. See
[docs/architecture.md](docs/architecture.md) for details.

## Production / home server

```powershell
pnpm build
pnpm start
```

For home-network use, start the container with:

```powershell
docker compose up --build -d
```

On Windows, double-click `deploy.bat` to run the same rebuild. The window stays open
afterward so the container status and any errors remain visible. It can also be run
from a terminal:

```bat
deploy.bat
```

The app is then available on the host computer at `http://localhost:4173` and to other
devices on the same network at `http://<computer-ip>:4173`. On Windows, `ipconfig`
shows the computer's IPv4 address. Bookmark that address on the phone; no phone app or
installation is required.

The `savor-data` Docker volume holds `savor.sqlite`, so recipes and lists survive
container replacement and application updates. Inbox attachments are kept in the same
volume under `/data/inbox`. The host must remain awake and Docker Desktop must be
running while another device uses the app.

## Home inbox

Open the **Inbox** tab to send recipe text, links, photos, PDFs, notes, or feature ideas
from a phone to the laptop. Each item can contain a link, 10,000-character note, and
one attachment up to 15 MB. Inbox data requires a connection to the home server; it is
not stored only in the phone browser.

Attachments are checked from their file contents rather than trusting the supplied
file name or media type. JPEG, PNG, GIF, WebP, BMP, HEIC, PDF, UTF-8 text, and Markdown
are accepted. Potentially active formats such as SVG are rejected, and non-image files
are downloaded instead of rendered in the app's origin. Total attachment storage is
limited to 500 MiB by default; set `SAVOR_UPLOAD_QUOTA_BYTES` to choose another limit.

This is an in-app inbox. Registering Savor in Android or iOS's native Share menu is a
separate enhancement that requires an installed HTTPS PWA and varies by mobile OS.

Authentication is optional for `pnpm start`: omit `SAVOR_PASSWORD` for local
development. When a password is set, `SAVOR_SESSION_SECRET` must be a different random
string of at least 32 characters. The default Compose configuration intentionally
leaves authentication disabled because plain HTTP does not encrypt passwords.

The server applies browser security headers and per-client write/upload rate limits.
The production container runs the Node process as an unprivileged user and excludes
development dependencies. Keep TCP port 4173 limited to a trusted private LAN: do not
forward it through the router, and allow it only on the Windows Private firewall profile.

### Phone limitations

This HTTP setup is intended for use while the phone is connected to the home network.
The browser may retain local data, but offline launch and installable-PWA behavior are
not guaranteed without HTTPS. The server remains the persistent shared copy.

### Phone cannot open the app

1. Confirm the laptop is awake and Docker Desktop is running.
2. Run `docker compose ps`; the `savor` service should say `Up` and `healthy`.
3. Run `ipconfig` and use the current Wi-Fi IPv4 address, for example
   `http://192.168.178.24:4173`. A router may assign a different address after a
   reconnect or restart.
4. Make sure the phone is on the same home Wi-Fi and is not using a guest network or
   mobile data.
5. Open `http://<computer-ip>:4173/api/health` on the phone. `{"ok":true}` confirms
   the phone can reach the server.

For a stable bookmark, reserve the laptop's address in the router (DHCP reservation).
Docker's `restart: unless-stopped` policy restarts Savor after Docker starts, but it
cannot serve while Windows is asleep or before Docker Desktop has started.
