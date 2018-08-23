<?php
require_once 'class/Auth.php';
require_once 'class/Group.php';

if (Auth::isLoggedIn()) {
    $user_id = Auth::getUserId();
    if (Group::isAdmin($user_id)) {
        $remove_id = $_POST["removeId"];
        $groupId = $_POST["groupId"];
        Group::removeMember($groupId, $remove_id);
    }
}
?>
