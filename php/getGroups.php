<?php
require_once 'class/Group.php';
require_once 'class/Auth.php';

if (Auth::isLoggedIn()) {
    $user_id = Auth::getUserId();
    $groupList = Group::getGroupList($user_id);
    // var_dump($conversationList);

    echo json_encode($groupList);
}

?>
