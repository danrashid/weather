#!/usr/bin/env bash
set -e

DESTINATION=$1

LATEST=$(($(date +%s) / (60 * 20)))
curl --silent https://radar.weather.gov/ridge/standard/CONUS-LARGE_loop.gif -o "$DESTINATION$LATEST".gif

ls -1tr "$DESTINATION"* | head -n-18 | xargs rm -f

exit 0
