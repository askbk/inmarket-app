<?php
require_once 'class/Auth.php';
require_once 'class/Group.php';

if (Auth::isLoggedIn()) {
    $user_id = Auth::getUserId();
    $groupId = $_POST["groupId"];
    if (Group::isAdmin($user_id, $groupId) || User::getAdminLevel($user_id) > 1) {
        Group::insertPost($groupId, $user_id, $_POST["content"]);
    }
}
?>
