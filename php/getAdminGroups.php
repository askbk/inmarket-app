<?php
require_once 'class/Auth.php';
require_once 'class/Group.php';
require_once 'class/User.php';

if (Auth::isLoggedIn()) {
    $user_id = Auth::getUserId();

    if (User::getAdminLevel($user_id) > 0) {
        echo json_encode(Group::getGroupList($user_id, true));
    }
}

?>
