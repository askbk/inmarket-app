<?php
require_once 'class/Auth.php';
require_once 'class/Group.php';

if (Auth::isLoggedIn()) {
    $user_id = Auth::getUserId();
    $postId = $_POST["postId"];
    $content = $_POST["content"];

    echo Group::insertComment($postId, $user_id, $content);
}
?>
