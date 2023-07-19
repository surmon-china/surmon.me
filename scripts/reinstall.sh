#!/bin/bash

SHELL_PATH=$(dirname $0)

cd $SHELL_PATH
cd ..

echo "[deploy] pnpm installing..."
pnpm install --frozen-lockfile
echo "[deploy] pnpm install done"
