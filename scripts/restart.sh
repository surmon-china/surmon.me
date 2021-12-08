#!/bin/bash

echo "[deploy] restarting..."
pm2 restart surmon.me
echo "[deploy] restart done."
