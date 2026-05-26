#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-$(cd "$(dirname "$0")/.." && pwd)}"
BACKUP_DIR="${BACKUP_DIR:-$APP_DIR/.deploy-backup}"
ENV_FILE="$APP_DIR/.env.production"
BACKUP_ENV_FILE="$BACKUP_DIR/.env.production"

mkdir -p "$BACKUP_DIR"

if [ -f "$ENV_FILE" ]; then
  cp "$ENV_FILE" "$BACKUP_ENV_FILE"
fi

git -C "$APP_DIR" pull --ff-only

if [ -f "$BACKUP_ENV_FILE" ] && [ ! -f "$ENV_FILE" ]; then
  cp "$BACKUP_ENV_FILE" "$ENV_FILE"
fi

if [ -f "$ENV_FILE" ]; then
  echo "Production env preserved at $ENV_FILE"
else
  echo "Warning: .env.production is missing"
fi

echo "Update completed. Rebuild/restart the production service next."