# weather

Record the last 6 hours of [https://radar.weather.gov/ridge/standard/CONUS-LARGE_loop.gif](https://radar.weather.gov/ridge/standard/CONUS-LARGE_loop.gif) and display them in a loop.

### /etc/cron.d/weather

`*/10 * * * * root /home/pi/repos/weather/weather.sh /var/www/html/images/`
