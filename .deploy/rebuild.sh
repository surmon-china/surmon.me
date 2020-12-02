#!/bin/bash
 
WEB_PATH=$(dirname $0)
# WEB_USER='root'
# WEB_USERGROUP='root'
 
echo "[deploy] Fetch and rebuilding..."
cd $WEB_PATH
cd ..
echo "[deploy] path:" $(pwd)
echo "[deploy] pulling source code..."
git fetch --all && git reset --hard origin/master && git pull
git checkout master
# echo "changing permissions..."
# chown -R $WEB_USER:$WEB_USERGROUP $WEB_PATH
# chmod -R 777 $WEB_PATH
# sync && echo 3 | sudo tee /proc/sys/vm/drop_caches
echo "[deploy] building..."
yarn config set sass-binary-site http://npm.taobao.org/mirrors/node-sass
yarn install --frozen-lockfile
yarn build
echo "[deploy] Rebuild done."
