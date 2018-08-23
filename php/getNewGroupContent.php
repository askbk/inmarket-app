<?php
require_once 'class/Auth.php';
require_once 'class/Group.php';

if (Auth::isLoggedIn()) {
    $user_id    = Auth::getUserId();
    $groupId    = $_POST["groupId"];
    $prevPostId = $_POST["prevPostId"];
    $prevCommId = $_POST["prevCommId"];
    $postIds    = $_POST["postIds"];

    $newPosts = Group::getNewPosts($groupId, $prevPostId);
    $newComments = array();

    foreach ($postIds as $postId) {
        $temp = Group::getPostComments($postId, $prevCommId);
        if (sizeof($temp) > 0) {
            $newComments = array_merge($newComments, $temp);
        }
    }

    $posts = array();

    foreach ($newPosts as $OP) {
        // var_dump(Group::getPostComments($OP["post_id"]));
        $comments = Group::getPostComments($OP["post_id"]);
        $posts[] = array('OP' => array($OP), 'comments' => $comments);
    }

    $result = array('posts' => $posts, 'comments' => $newComments);

    echo json_encode($result);
}
?>
