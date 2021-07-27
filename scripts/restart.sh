#!/bin/bash

echo "[deploy] Restarting..."
pm2 restart surmon.me
echo "[deploy] Restart done."
