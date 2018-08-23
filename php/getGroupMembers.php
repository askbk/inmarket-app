<?php
require_once 'class/Auth.php';
require_once 'class/Group.php';

if (Auth::isLoggedIn()) {
    if (!isset($_POST["groupId"])) {
        exit();
    }

    $user_id = Auth::getUserId();
    $groupId = $_POST["groupId"];

    if (Group::isAdmin($user_id, $groupId)) {
        echo json_encode(Group::getMembers($groupId));
    }
}

?>
