<?php
require_once 'class/Auth.php';
require_once 'class/Message.php';
require_once 'class/User.php';

if (Auth::isLoggedIn()) {
    $user_id = Auth::getUserId();
    $conversationId = $_POST["conversationId"];
    $participantId = $_POST["participantId"];

    if (User::getAdminLevel($user_id) > 0 && User::exists($participantId)) {
        echo Message::addParticipant($conversationId, $participantId);
    } else {
        // echo Group::isAdmin($user_id, $groupId);
        // echo User::exists($memberId);
        // echo Group::isMember($user_id, $groupId);
    }
}
?>
