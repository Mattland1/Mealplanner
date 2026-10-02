# Repository working instructions

## Local review preview

After completing any feature or user-interface change:

1. Run the relevant tests and production build first.
2. Start a local review version of the changed checkout with `pnpm dev --host 127.0.0.1`.
3. Leave the preview running for the user unless they ask for it to be stopped.
4. Report the exact localhost URL. Prefer port 5173; if it is already occupied by a preview that cannot safely be stopped, use the next available port and say so clearly.
5. If the feature requires the API, synchronization, authentication, or inbox, also start `pnpm dev:server` and report any local prerequisites.

This preview is for confirmation only. Do not deploy, merge, or push merely to make the preview available.
