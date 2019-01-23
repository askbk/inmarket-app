<?php
require_once '../class/Auth.php';
require_once '../class/User.php';

if (Auth::isLoggedIn()) {
    $user_id = Auth::getUserId();
    $params = json_decode(stripslashes(file_get_contents("php://input")));
    $receiver_id = $params->receiver;

    if ($receiver_id == $user_id) {
        echo "Cannot send contact request to yourself. API level.";
        exit();
    }

    User::sendContactRequest($user_id, $receiver_id);
} else {
    header("HTTP/1.0 401 Unauthorized");
    echo "Not logged in";
    exit();
}
?>
