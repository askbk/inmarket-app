<?php
require_once 'class/Auth.php';
require_once 'class/Group.php';
require_once 'class/Message.php';

if (Auth::isLoggedIn()) {
    $user_id = Auth::getUserId();
    $groupId = $_POST["groupId"];
    if (Group::isAdmin($user_id, $groupId)) {
        $remove_id = $_POST["removeId"];
        Group::removeMember($remove_id, $groupId);
        Message::removeParticipant(Group::getConversation($groupId)["conversation_id"], $user_id);
    }
}
?>
