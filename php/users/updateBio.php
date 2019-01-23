<?php
require_once '../class/Auth.php';
require_once '../class/User.php';

if (Auth::isLoggedIn()) {
    $user_id = Auth::getUserId();
    $params = json_decode(stripslashes(file_get_contents("php://input")));

    $bio = $params->bio;

    User::updateBio($bio, $user_id);
}
?>
