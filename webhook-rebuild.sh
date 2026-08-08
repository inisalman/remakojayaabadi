#!/bin/bash
# Rebuild Remako frontend from Strapi content changes
# Called by webhook server when Strapi content is updated

set -euo pipefail
REPO=/root/remakojayaabadi-gh
FRONTEND=$REPO/frontend
LOGFILE=/var/log/remako-rebuild.log
LOCKFILE=/tmp/remako-rebuild.lock

# Debounce: skip if another rebuild is running
exec 200>"$LOCKFILE"
if ! flock -n 200; then
  echo "[debounce] rebuild already in progress, skipping" >> "$LOGFILE"
  exit 0
fi

exec >> "$LOGFILE" 2>&1

echo "=== REBUILD START $(date -u) ==="

cd "$REPO"
echo "[git] pulling latest..."
git pull origin main 2>&1

cd "$FRONTEND"
TAG="easypanel/app/remakojayaabadi:rebuild-$(date +%s)"

echo "[docker] building $TAG..."
docker build --network=host -t "$TAG" . 2>&1

echo "[docker] updating service..."
docker service update --force --image "$TAG" app_remakojayaabadi 2>&1

echo "[cleanup] removing old images (keep last 3)..."
docker images easypanel/app/remakojayaabadi --format '{{.Repository}}:{{.Tag}}' \
  | grep -v ':rebuild-' \
  | sort -r \
  | tail -n +4 \
  | xargs -r docker rmi 2>/dev/null || true

echo "=== REBUILD DONE $(date -u) ==="
