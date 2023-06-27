<?php

$filepaths = glob('/var/www/html/images/*.gif');
usort($filepaths, function($a, $b) {
  return filemtime($a) - filemtime($b);
});

header('Content-type: text/plain');

foreach($filepaths as $filepath) {
  echo basename($filepath) . "\n";
}

?>
