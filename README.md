# weather

Cache the last 3 hours of [https://radar.weather.gov/ridge/standard/CONUS-LARGE_loop.gif](https://radar.weather.gov/ridge/standard/CONUS-LARGE_loop.gif) and play them in a loop.

### Setup

- `$ cp weather_cron_example weather_cron`
- Adjust the contents of weather_cron as needed
- `$ sudo chown root:root weather_cron`
- `$ sudo ln -s $(pwd)/weather_cron /etc/cron.d/`
- Symlink the contents of ./public/ into place (e.g. /var/www/html/)
- Make sure your HTTP server has streaming support enabled

### Testing

- `sudo apt install php-cli` if necessary
- Create `./public/images` and copy GIFs into it. Use `scp -rp` to preserve file modification times.
- `PHP_CLI_SERVER_WORKERS=2 php -S 0.0.0.0:9000 -t ./public/`
