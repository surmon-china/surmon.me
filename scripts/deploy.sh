#!/bin/bash
set -e

# scripts directory
SHELL_PATH=$(dirname "$0")

# PM2 application name
PM2_APP_NAME=surmon.me

echo "[deploy] start..."

# Stop the PM2 application
echo "[deploy] stop pm2 app..."
# -s –silent: hide all messages https://pm2.io/docs/runtime/reference/pm2-cli/
pm2 stop "$PM2_APP_NAME" -s

# Navigate to the project root directory
cd "$SHELL_PATH"
cd ..

# Print information
echo "[deploy] fetching..."
echo "[deploy] pulling source code..."

# Fetch the latest code
git fetch --all && git reset --hard origin/main && git pull
git checkout main

# Install dependencies
echo "[deploy] pnpm installing..."
pnpm install --frozen-lockfile

# Print information
echo "[deploy] release downloading..."

# Download and unzip the release package
curl -sOL https://github.com/surmon-china/surmon.me/archive/refs/heads/release.zip
unzip -q release.zip
rm -rf dist
mv surmon.me-release dist
rm -rf release.zip

# Restart the PM2 application
echo "[deploy] restart pm2 app..."
pm2 restart "$PM2_APP_NAME" -s

echo "[deploy] finished"
