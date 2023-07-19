#!/bin/bash

SHELL_PATH=$(dirname $0)

cd $SHELL_PATH
cd ..

echo "[deploy] building..."
pnpm run build
echo "[deploy] build done"
