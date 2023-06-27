#!/usr/bin/env bash
set -e

destination=$1

for i in {9..0}
do
  url="https://radar.weather.gov/ridge/standard/CONUS-LARGE_$i.gif"
  etag=$(curl -sI $url | grep etag | sed -E 's/.+"(.+)".+/\1/')
  filepath="$destination$etag.gif"

  if [ ! -f $filepath ]
  then
    curl -s $url -o $filepath
  fi
done

ls -1tr "$destination"*.gif | head -n-90 | xargs rm -f
ls -1tr $destination | grep gif > "$destination"manifest.txt

exit 0
