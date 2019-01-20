<?php
require_once 'class/Auth.php';
require_once 'class/Message.php';

if (Auth::isLoggedIn()) {
    $user_id1 = Auth::getUserId();
    $user_id2 = $_POST["userId"];

    $conversationId = Message::conversationExists($user_id1, $user_id2);

    if ($conversationId > 0) {
        echo $conversationId;
    } else {
        echo json_encode(Message::startConversation($user_id1, $user_id2));
    }
}

?>
