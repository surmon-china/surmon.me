#!/bin/bash

SHELL_PATH=$(dirname $0)

echo "[deploy] start deployment..."
sh ${SHELL_PATH}/refetch.sh

# install dependencies & clone release resource
sh ${SHELL_PATH}/reinstall.sh
sh ${SHELL_PATH}/reclone.sh
sh ${SHELL_PATH}/restart.sh
echo "[deploy] finished"
