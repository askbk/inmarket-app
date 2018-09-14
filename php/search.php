<?php
require_once 'class/Auth.php';
require_once 'class/Company.php';
require_once 'class/Media.php';
require_once 'class/User.php';
require_once 'class/Group.php';
require_once 'class/Message.php';

if (Auth::isLoggedIn()) {
    $query = $_POST["q"];
    if (isset($_POST["exclusiveGroupSearch"])) {
        $groupId = $_POST["exclusiveGroupSearch"];
        echo json_encode(Group::exclusiveSearch($query, $groupId));
    } elseif (isset($_POST["exclusiveConversationSearch"])) {
        $conversationId = $_POST["conversationId"];
        echo json_encode(Message::exclusiveSearch($query, $conversationId));
    }
}
?>
