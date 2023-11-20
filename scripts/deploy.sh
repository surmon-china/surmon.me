#!/bin/bash
set -e

# scripts directory
SHELL_PATH=$(dirname "$0")

# PM2 application name
PM2_APP_NAME=surmon.me

# Stop the PM2 application
echo "[deploy] stop pm2 app..."
# -s –silent: hide all messages
pm2 stop "$PM2_APP_NAME" -s

# Upgrade source code & release package
sh ${SHELL_PATH}/upgrade.sh

# Restart the PM2 application
echo "[deploy] restart pm2 app..."
pm2 restart "$PM2_APP_NAME" -s

echo "[deploy] finished"
