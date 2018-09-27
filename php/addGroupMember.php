<?php
require_once 'class/Auth.php';
require_once 'class/Group.php';
require_once 'class/User.php';
require_once 'class/Message.php';

if (Auth::isLoggedIn()) {
    $user_id = Auth::getUserId();
    $groupId = $_POST["groupId"];
    $memberId = $_POST["memberId"];

    if (Group::isAdmin($user_id, $groupId) && User::exists($memberId)) {
        Group::addMember($groupId, $memberId);
        $conv = Group::getConversation($groupId);
        Message::addParticipant($conv["conversation_id"], $memberId);
    } else {
        echo Group::isAdmin($user_id, $groupId);
        echo User::exists($memberId);
        echo Group::isMember($user_id, $groupId);
    }
}
?>
