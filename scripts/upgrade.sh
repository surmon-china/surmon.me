#!/bin/bash
set -e

# scripts directory
SHELL_PATH=$(dirname "$0")

echo "[upgrade] start..."

# Navigate to the project root directory
cd "$SHELL_PATH"
cd ..

# Print information
echo "[upgrade] pulling source code..."

# Fetch the latest code
git fetch --all && git reset --hard origin/main && git pull
git checkout main

# Install dependencies
echo "[upgrade] pnpm installing..."
pnpm install --frozen-lockfile

# Print information
echo "[upgrade] release downloading..."

# Download and unzip the release package
curl -sOL https://github.com/surmon-china/surmon.me/archive/refs/heads/release.zip
unzip -q release.zip
rm -rf dist
mv surmon.me-release dist
rm -rf release.zip

echo "[upgrade] finished"
