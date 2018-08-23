<?php
require_once 'class/Group.php';
require_once 'class/Auth.php';

if (Auth::isLoggedIn()) {
    $user_id = Auth::getUserId();
    $groupId = $_POST["groupId"];
    // $conversationName = Group::getGroupName($convId, $user_id);
    $count = $_POST["count"];
    $offset = $_POST["offset"];

    $OPs = Group::getPosts($groupId);

    $posts = array();

    foreach ($OPs as $OP) {
        $comments = Group::getPostComments($OP["post_id"]);
        $posts[] = array('OP' => array($OP), 'comments' => $comments);
    }

    echo json_encode($posts);
}
?>
