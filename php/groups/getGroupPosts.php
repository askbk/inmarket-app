<?php
require_once 'class/Group.php';
require_once 'class/Auth.php';

if (Auth::isLoggedIn()) {
    $rest_json = file_get_contents("php://input");
    $_POST = json_decode($rest_json, true);
    $user_id = Auth::getUserId();
    $groupId = $_POST["groupId"];

    if (isset($_POST["prevPostId"]) && isset($_POST["prevCommId"])) {
        $prevPostId = $_POST["prevPostId"];
        $prevCommId = $_POST["prevCommId"];
        $newPosts = Group::getNewPosts($groupId, $prevPostId);
        $newComments = Group::getNewPostComments($postId, $prevCommId);

        $posts = array();

        foreach ($newPosts as $OP) {
            $comments = Group::getPostComments($OP["post_id"]);
            $posts[] = array('OP' => array($OP), 'comments' => $comments);
        }

        $result = array('posts' => $posts, 'comments' => $newComments);

        echo json_encode($result);
        exit();
    } else {
        // var_dump($_POST);
        $OPs = Group::getPosts($groupId);

        $posts = array();

        foreach ($OPs as $OP) {
            $comments = Group::getPostComments($OP["post_id"]);
            $posts[] = array('OP' => array($OP), 'comments' => $comments);
        }

        echo json_encode($posts);
    }
}
?>
