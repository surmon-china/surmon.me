#!/bin/bash

PM2_APP_NAME=surmon.me

SHELL_PATH=$(dirname $0)

echo "[deploy] start deployment..."

# pm2: not found
# sudo ln -s "$NVM_DIR/versions/node/$(nvm version)/bin/pm2" "/usr/local/bin/pm2"
echo "[deploy] stop pm2 app..."
pm2 stop $PM2_APP_NAME

sh ${SHELL_PATH}/refetch.sh
sh ${SHELL_PATH}/reinstall.sh
sh ${SHELL_PATH}/reload.sh

echo "[deploy] restart pm2 app..."
pm2 restart $PM2_APP_NAME

echo "[deploy] finished"
