<?php
require_once 'class/Message.php';
require_once 'class/Auth.php';

if (Auth::isLoggedIn()) {
    $user_id = Auth::getUserId();
    $conversationList = Message::getConversationList($user_id, 10, 0);
    // var_dump($conversationList);
    for ($i=0; $i < count($conversationList); $i++) {
        $conversationList[$i]["name"] = Message::getConversationName($conversationList[$i]["conversation_id"], $user_id);
    }
    echo json_encode($conversationList);
}

?>
