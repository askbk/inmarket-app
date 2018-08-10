<?php
require_once 'class/Auth.php';
require_once 'class/Group.php';

if (Auth::isLoggedIn()) {
    $user_id = Auth::getUserId();
    $groupId = $_POST["groupId"];
    $prevPostId = $_POST["prevPostId"];
    $prevCommId = $_POST["prevCommId"];

    $newPosts = Group::getNewPosts($groupId, $prevPostId);
    $newComments = Group::getNewComments($groupId, $prevCommId);

}
?>
