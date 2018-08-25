<?php
require_once 'class/Auth.php';
require_once 'class/Group.php';
require_once 'class/User.php';

if (Auth::isLoggedIn()) {
    $user_id = Auth::getUserId();
    $groupId = $_POST["groupId"];
    $memberId = $_POST["memberId"];

    if (Group::isAdmin($user_id, $groupId) && User::exists($memberId)) {
        echo Group::addMember($groupId, $memberId);
    } else {
        echo Group::isAdmin($user_id, $groupId);
        echo User::exists($memberId);
        echo Group::isMember($user_id, $groupId);
    }
}
?>
