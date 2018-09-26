<?php
require_once 'class/Auth.php';
require_once 'class/Message.php';

if (Auth::isLoggedIn()) {
    $user_id = Auth::getUserId();
    $conversationId = $_POST["conversationId"];
    $content = $_POST["content"];
    echo Message::send($conversationId, $user_id, $content);
}
?>
