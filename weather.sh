#!/usr/bin/env bash
set -e

destination=$1
tmp=/tmp/weather.gif

for i in {9..0}
do
  url="https://radar.weather.gov/ridge/standard/CONUS-LARGE_$i.gif"
  last_modified=$(curl -s -D /dev/stdout -o $tmp $url | grep last-modified | sed -E 's/last-modified: (.+)/\1/')
  hash=$(md5sum $tmp | awk '{print $1;}')
  filepath="$destination$hash.gif"

  if [ ! -s $filepath ]
  then
    mv $tmp $filepath
    touch -d "$last_modified" $filepath
  fi
done

ls -1tr "$destination"*.gif | head -n-90 | xargs rm -f

exit 0
