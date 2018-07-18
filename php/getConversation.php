<?php
require_once 'class/Message.php';
require_once 'class/Auth.php';
require_once 'class/User.php';

if (Auth::isLoggedIn()) {
    $user_id = Auth::getUserId();
    $convId = $_POST["conversationId"];
    $conversationName = Message::getConversationName($convId, $user_id);
    $count = $_POST["count"];
    $offset = $_POST["offset"];

    $messages = Message::getConversationMessages($convId, $count, $offset);


    for ($i=0; $i < count($messages); $i++) {
        if ($messages[$i]["sender"] != $user_id) {
            $messages[$i]["styleClass"] = "receivedMessage";
        } else {
            $messages[$i]["styleClass"] = "sentMessage";
        }
    }

    $conversation = array('messages' => $messages, 'name' => $conversationName);

    echo json_encode($conversation);
}
?>
