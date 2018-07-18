<?php
require_once 'class/Auth.php';
require_once 'class/Message.php';

if (Auth::isLoggedIn()) {
    $user_id = Auth::getUserId();
    $conversationId = $_POST["conversationId"];
    $content = $_POST["content"];
    Message::sendMessage($conversationId, $user_id, $content);
}
?>
