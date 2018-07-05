<?php
include 'DB.php';

$eventsArray = DB::getEvents("drammen");
$result = array();

foreach ($eventsArray as $key => $event) {
    $result[$key] = new stdClass;
    foreach ($event as $attr => $value) {
        $result[$key]->$attr = $value;
    }
}

echo json_encode($result);

?>
