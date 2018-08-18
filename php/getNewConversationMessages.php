<?php
require_once 'class/Auth.php';
require_once 'class/Message.php';

if (Auth::isLoggedIn()) {
    $prevId = $_POST["prevId"];
    $user_id = Auth::getUserId();
    $conversationId = $_POST["conversationId"];

    $newMessages = Message::getNewConversationMessages($conversationId, $prevId);

    for ($i=0; $i < count($newMessages); $i++) {
        if ($newMessages[$i]["sender"] != $user_id) {
            $newMessages[$i]["styleClass"] = "receivedMessage";
        } else {
            $newMessages[$i]["styleClass"] = "sentMessage";
        }
    }

    echo json_encode($newMessages);
}
?>
