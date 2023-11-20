#!/bin/bash
set -e

# PM2 application name
PM2_APP_NAME=surmon.me

# scripts directory
SHELL_PATH=$(dirname "$0")

echo "[deploy] starting..."

# Stop the PM2 application
# pm2 -s –silent: hide all messages
echo "[deploy] stop pm2 app..."
pm2 stop "$PM2_APP_NAME" -s

# Upgrade source code & release package
sh ${SHELL_PATH}/upgrade-on-server.sh

# Restart the PM2 application
echo "[deploy] restart pm2 app..."
pm2 restart "$PM2_APP_NAME" -s

echo "[deploy] finished."
