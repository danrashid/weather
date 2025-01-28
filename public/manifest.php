<?php

header("Content-Type: text/event-stream");

$data = [];

while (true) {

  $filenames = glob('./images/*.gif');
  usort($filenames, function ($a, $b) {
    return filemtime($a) - filemtime($b);
  });

  $try_data = array_map(function ($filepath) {
    return basename($filepath, '.gif');
  }, $filenames);

  if ($data !== $try_data) {
    $data = $try_data;
    echo "event: refresh\n",
    "data: " . json_encode($data),
    "\n\n";
  } else {
    echo ":ping\n\n";
  }

  while (ob_get_level() > 0) {
    ob_end_flush();
  }
  flush();

  if (connection_aborted()) break;

  sleep(60);
}
