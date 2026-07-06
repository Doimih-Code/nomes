#!/usr/bin/env bash
set -uo pipefail

APP_DIR="/apps/nomes"
LOG_FILE="$APP_DIR/deploy/healthcheck.log"
ACME_FILE="$APP_DIR/letsencrypt/acme.json"

log() {
  printf '[%s] %s\n' "$(date -u +'%Y-%m-%dT%H:%M:%SZ')" "$1" >> "$LOG_FILE"
}

# keep the log from growing forever
if [ -f "$LOG_FILE" ]; then
  tail -n 1000 "$LOG_FILE" > "$LOG_FILE.tmp" 2>/dev/null && mv "$LOG_FILE.tmp" "$LOG_FILE"
fi

# self-heal: acme.json must be a regular file (Docker turns a missing
# bind-mount source into an empty directory, which breaks traefik)
if [ -d "$ACME_FILE" ]; then
  log "acme.json is a directory (broken bind mount) - fixing"
  if rmdir "$ACME_FILE" 2>/dev/null; then
    touch "$ACME_FILE" && chmod 600 "$ACME_FILE"
    log "recreated acme.json as an empty file"
  else
    log "ERROR: $ACME_FILE is a non-empty directory, needs manual review"
  fi
fi

cd "$APP_DIR" || exit 1

needs_restart=0
for c in nomes-app nomes-traefik; do
  status=$(docker inspect -f '{{.State.Status}}' "$c" 2>/dev/null || echo "missing")
  if [ "$status" != "running" ]; then
    log "container $c status=$status"
    needs_restart=1
  fi
done

if [ "$needs_restart" = "1" ]; then
  log "running docker compose up -d to restore containers"
  docker compose up -d >> "$LOG_FILE" 2>&1
  sleep 5
fi

http_code=$(curl -sk -o /dev/null -w '%{http_code}' -H "Host: www.nomes.ro" https://localhost --max-time 10 || echo "000")
if [ "$http_code" != "200" ]; then
  log "site check failed (HTTP $http_code) - recreating traefik"
  docker compose up -d --force-recreate traefik >> "$LOG_FILE" 2>&1
fi
