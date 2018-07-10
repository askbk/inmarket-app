<?php
require_once 'DB.php';
require_once 'Auth.php';

if (Auth::isLoggedIn()) {
    $eventId = $_GET["event"];
    if ($eventId == "-1") {
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
        $event = DB::getEvent($eventId);

        echo json_encode($event);
    }

} else {
    echo "Not logged in";
}

?>
