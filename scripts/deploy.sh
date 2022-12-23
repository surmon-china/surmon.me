#!/bin/bash

PM2_APP_NAME=surmon.me

SHELL_PATH=$(dirname $0)

echo "[deploy] start deployment..."

pm2 stop $PM2_APP_NAME

sh ${SHELL_PATH}/refetch.sh
sh ${SHELL_PATH}/reinstall.sh
sh ${SHELL_PATH}/reload.sh

pm2 restart $PM2_APP_NAME

echo "[deploy] finished"
