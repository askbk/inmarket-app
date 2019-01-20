<?php
require_once '../class/Auth.php';
require_once '../class/User.php';

if (Auth::isLoggedIn()) {
    $user_id = Auth::getUserId();

    $bio = $_POST["bio"];

    User::updateBio($bio, $user_id);
}
?>
