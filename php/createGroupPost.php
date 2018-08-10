<?php
require_once 'class/Auth.php';
require_once 'class/Group.php';

if (Auth::isLoggedIn()) {
    $user_id = Auth::getUserId();
    $groupId = $_POST["groupId"];
    $content = $_POST["content"];

    Group::insertPost($groupId, $user_id, $content);
}
?>
