#!/bin/sh
# Runs as root over the existing SSH connection. Never stores SSH credentials.
set -eu

release=${1:?release ID required}
archive_sha=${2:?archive SHA-256 required}
case "$release" in ''|*[!a-zA-Z0-9-]*) echo 'Invalid release ID' >&2; exit 1;; esac
case "$archive_sha" in ''|*[!a-f0-9]*) echo 'Invalid SHA-256' >&2; exit 1;; esac
[ "${#archive_sha}" -eq 64 ] || exit 1

stage=/home/ubuntu/.studio-kwonyc-deploy
archive="$stage/$release.tar.gz"
app=/srv/studio-kwonyc
destination="$app/releases/$release"
backup="/etc/caddy/Caddyfile.before-$release"
candidate="$app/Caddyfile.$release"

[ "$(id -u)" -eq 0 ] || { echo 'Root execution required' >&2; exit 1; }
[ ! -e "$destination" ] || { echo 'Release already exists' >&2; exit 1; }
printf '%s  %s\n' "$archive_sha" "$archive" | sha256sum -c -
if [ -e "$app/current" ] && [ ! -L "$app/current" ]; then
  echo 'Refusing to replace a non-symlink current directory' >&2; exit 1
fi
previous=$(readlink "$app/current" || true)

mkdir -p "$destination"
tar -xzf "$archive" -C "$destination" --no-same-owner
test -s "$destination/index.html"
test -s "$destination/design.css"
test -s "$destination/assets/haru-sudoku-current.png"
chown -R root:root "$destination"
find "$destination" -type d -exec chmod 755 {} +
find "$destination" -type f -exec chmod 644 {} +
runuser -u caddy -- test -r "$destination/index.html"

cat > "$candidate" <<'CADDY'
studiokwonyc.com {
    root * /srv/studio-kwonyc/current
    file_server
}

www.studiokwonyc.com {
    redir https://studiokwonyc.com{uri} permanent
}
CADDY
caddy fmt --overwrite "$candidate"
caddy validate --config "$candidate" --adapter caddyfile
cp -p /etc/caddy/Caddyfile "$backup"

rollback() {
  status=$?
  trap - EXIT HUP INT TERM
  if [ "$status" -ne 0 ]; then
    cp -p "$backup" /etc/caddy/Caddyfile
    if [ -n "$previous" ]; then
      ln -s "$previous" "$app/rollback-$release"
      mv -Tf "$app/rollback-$release" "$app/current"
    elif [ -L "$app/current" ]; then
      rm "$app/current"
    fi
    systemctl reload caddy || true
    echo "Deployment failed; previous Caddy configuration restored: $backup" >&2
  fi
  exit "$status"
}
trap rollback EXIT
trap 'exit 1' HUP INT TERM

ln -s "$destination" "$app/current-$release"
mv -Tf "$app/current-$release" "$app/current"
cp "$candidate" /etc/caddy/Caddyfile
systemctl reload caddy
systemctl is-active --quiet caddy
curl --fail --silent --show-error --max-time 30 \
  --resolve studiokwonyc.com:443:127.0.0.1 \
  https://studiokwonyc.com/ -o "$stage/$release.response.html"
expected=$(sha256sum "$destination/index.html" | cut -d ' ' -f 1)
actual=$(sha256sum "$stage/$release.response.html" | cut -d ' ' -f 1)
[ "$expected" = "$actual" ]

trap - EXIT HUP INT TERM
printf 'DEPLOYED_RELEASE=%s\nCADDY_BACKUP=%s\nPREVIOUS_RELEASE=%s\n' "$release" "$backup" "$previous"
