#!/bin/bash

APP_NAME=surmon.me

SHELL_PATH=$(dirname $0)

echo "[deploy] start deployment..."

pm2 stop $APP_NAME

sh ${SHELL_PATH}/refetch.sh
sh ${SHELL_PATH}/reinstall.sh
sh ${SHELL_PATH}/reload.sh

pm2 start $APP_NAME

echo "[deploy] finished"
