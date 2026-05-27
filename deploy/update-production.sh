#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-$(cd "$(dirname "$0")/.." && pwd)}"
BACKUP_DIR="${BACKUP_DIR:-$APP_DIR/.deploy-backup}"
ENV_FILE="$APP_DIR/.env.production"
BACKUP_ENV_FILE="$BACKUP_DIR/.env.production"
REMOTE_NAME="${REMOTE_NAME:-origin}"
REMOTE_URL="${REMOTE_URL:-https://github.com/Doimih-Code/nomes.git}"
DEPLOY_BRANCH="${DEPLOY_BRANCH:-main}"

mkdir -p "$BACKUP_DIR"

if [ -f "$ENV_FILE" ]; then
  cp "$ENV_FILE" "$BACKUP_ENV_FILE"
fi

git -C "$APP_DIR" remote set-url "$REMOTE_NAME" "$REMOTE_URL" 2>/dev/null || \
  git -C "$APP_DIR" remote add "$REMOTE_NAME" "$REMOTE_URL"
git -C "$APP_DIR" fetch "$REMOTE_NAME"
git -C "$APP_DIR" checkout "$DEPLOY_BRANCH"
git -C "$APP_DIR" reset --hard "$REMOTE_NAME/$DEPLOY_BRANCH"

if [ -f "$BACKUP_ENV_FILE" ] && [ ! -f "$ENV_FILE" ]; then
  cp "$BACKUP_ENV_FILE" "$ENV_FILE"
fi

if [ -f "$ENV_FILE" ]; then
  echo "Production env preserved at $ENV_FILE"
else
  echo "Warning: .env.production is missing"
fi

docker compose -f "$APP_DIR/docker-compose.yml" up -d --build --force-recreate app

echo "Update completed on branch $DEPLOY_BRANCH from $REMOTE_URL"
