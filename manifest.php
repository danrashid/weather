<?php

$filepaths = glob('./images/*.gif');
usort($filepaths, function ($a, $b) {
  return filemtime($a) - filemtime($b);
});

header('Content-type: text/plain');
echo implode("\n", array_map(function ($filepath) {
  return basename($filepath, '.gif');
}, $filepaths));
