# weather

Record the last _n_ hours of [https://radar.weather.gov/ridge/standard/CONUS-LARGE_loop.gif](https://radar.weather.gov/ridge/standard/CONUS-LARGE_loop.gif) and display them in a loop.

### Setup

- `$ cp weather_cron_example weather_cron`
- Adjust the contents of weather_cron as needed
- `$ sudo chown root:root weather_cron`
- `$ sudo ln -s $(pwd)/weather_cron /etc/cron.d/`
- Symlink the contents of ./public/ into place (e.g. /var/www/html/)

### Testing

`PHP_CLI_SERVER_WORKERS=2 php -S localhost:9000 -t ./public/`
