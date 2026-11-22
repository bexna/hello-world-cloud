#!/bin/bash
set -euxo pipefail
exec > >(tee /var/log/hello-world-bootstrap.log | logger -t hello-world-bootstrap -s 2>/dev/console) 2>&1

dnf -y install nodejs npm git
if [ ! -d /opt/hello-world/.git ]; then
  git clone --depth 1 https://github.com/bexna/hello-world-cloud.git /opt/hello-world
else
  git -C /opt/hello-world pull --ff-only
fi

cat >/etc/systemd/system/hello-world.service <<'UNIT'
[Unit]
Description=Hello World web app
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
WorkingDirectory=/opt/hello-world
Environment=PORT=3000
ExecStart=/usr/bin/npm --prefix /opt/hello-world/backend start
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
UNIT

systemctl daemon-reload
systemctl enable --now hello-world
