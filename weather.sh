#!/usr/bin/env bash
set -e

destination=$1

for i in {9..0}
do
  url="https://radar.weather.gov/ridge/standard/CONUS-LARGE_$i.gif"
  last_modified=$(curl -sI $url | grep last-modified | sed -E 's/last-modified: (.+)/\1/')
  hash=$(echo $last_modified | md5sum | awk '{print $1;}')
  filepath="$destination$hash.gif"

  if [ ! -f $filepath ]
  then
    curl -s $url -o $filepath
    touch -d "$last_modified" $filepath
  fi
done

ls -1tr "$destination"*.gif | head -n-90 | xargs rm -f
ls -1tr $destination | grep gif > "$destination"manifest.txt

exit 0
