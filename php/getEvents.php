<?php
require_once 'DB.php';
require_once 'Auth.php';

if (Auth::isLoggedIn()) {
    $eventsArray = DB::getEvents("drammen");
    $result = array();
    foreach ($eventsArray as $key => $event) {
        $result[$key] = new stdClass;
        foreach ($event as $attr => $value) {
            $result[$key]->$attr = $value;
        }
    }
    echo json_encode($result);
} else {
    echo "Not logged in";
}

?>
