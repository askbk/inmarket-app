<?php
require_once '../class/Auth.php';
require_once '../class/User.php';

if (Auth::isLoggedIn()) {
    $user_id = Auth::getUserId();
    $params = json_decode(stripslashes(file_get_contents("php://input")));
    $sender_id = $params->sender;

    if (!User::acceptContactRequest($sender_id, $user_id);) {
        echo "Contact request does not exist";
        exit();
    }

    echo "Successfully accepted contact request";
} else {
    header("HTTP/1.0 401 Unauthorized");
    echo "Not logged in";
    exit();
}
?>
