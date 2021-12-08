#!/bin/bash

SHELL_PATH=$(dirname $0)

cd $SHELL_PATH
cd ..

echo "[deploy] cloneing..."
rm -rf dist
mkdir dist
cd dist
git clone -b release git@github.com:surmon-china/surmon.me.git .
rm -rf .git
echo "[deploy] clone release done."
