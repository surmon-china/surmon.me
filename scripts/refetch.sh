#!/bin/bash

SHELL_PATH=$(dirname $0)
# WEB_USER='root'
# WEB_USERGROUP='root'

cd $SHELL_PATH
cd ..

echo "[deploy] fetching..."
echo "[deploy] path:" $(pwd)
echo "[deploy] pulling source code..."
git fetch --all && git reset --hard origin/main && git pull
git checkout main
# echo "changing permissions..."
# chown -R $WEB_USER:$WEB_USERGROUP $SHELL_PATH
# chmod -R 777 $SHELL_PATH
# sync && echo 3 | sudo tee /proc/sys/vm/drop_caches
