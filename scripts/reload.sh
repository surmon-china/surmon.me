#!/bin/bash

SHELL_PATH=$(dirname $0)

cd $SHELL_PATH
cd ..

echo "[deploy] downloading..."
rm -rf dist
mkdir dist
cd dist
curl -OL https://github.com/surmon-china/surmon.me/archive/refs/heads/release.zip && unzip release.zip
mv surmon.me-release/* ./
rm -rf surmon.me-release
rm -rf release.zip
echo "[deploy] download release done"
