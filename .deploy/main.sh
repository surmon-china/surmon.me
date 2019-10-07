#!/bin/bash

SHELL_PATH=$(dirname $0)

echo ${SHELL_PATH}/rebuild.sh
echo "[deploy] Start deployment..."
sh ${SHELL_PATH}/rebuild.sh
sh ${SHELL_PATH}/restart.sh
echo "[deploy] Finished."
