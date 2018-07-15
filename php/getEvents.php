<?php
require_once 'class/Event.php';
require_once 'class/Auth.php';

if (Auth::isLoggedIn()) {
    $eventId = $_GET["event"];
    if ($eventId == "-1") {
        $eventsArray = Event::getEvents("drammen");
        $result = array();
        foreach ($eventsArray as $key => $event) {
            $result[$key] = new stdClass;
            foreach ($event as $attr => $value) {
                $result[$key]->$attr = $value;
            }
        }
        echo json_encode($result);
    } else {
        $event = Event::getEvent($eventId);

        echo json_encode($event);
    }

} else {
    echo "Not logged in";
}

?>
