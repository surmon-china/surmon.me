#!/bin/bash

SHELL_PATH=$(dirname $0)

cd $SHELL_PATH
cd ..

echo "[deploy] fetching..."
echo "[deploy] path:" $(pwd)
echo "[deploy] pulling source code..."
git fetch --all && git reset --hard origin/main && git pull
git checkout main
