#!/bin/bash
set -e

# scripts directory
SHELL_PATH=$(dirname "$0")

echo "[upgrade] starting..."

cd "$SHELL_PATH"
cd ..

echo "[upgrade] pulling latest source code..."

# latest source code
git fetch origin main
git reset --hard origin/main
git pull origin main --depth 1

echo "[upgrade] pnpm installing..."

# install dependencies
pnpm install --frozen-lockfile

# latest release code
if [ -d "./dist/.git" ]; then
  echo "[upgrade] pulling latest release code..."
  cd ./dist
  git fetch origin release
  git reset --hard origin/release
  git pull origin release --depth 1
else
  echo "[upgrade] cloning latest release code..."
  rm -rf ./dist
  mkdir -p dist
  git clone --depth 1 -b release https://github.com/surmon-china/surmon.me.git ./dist
fi

echo "[upgrade] finished."
