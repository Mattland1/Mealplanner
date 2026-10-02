#!/bin/sh
set -eu

chown -R node:node /data
exec su-exec node:node "$@"
