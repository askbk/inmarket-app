<?php

require_once 'class/Auth.php';
require_once 'class/User.php';

if (Auth::isLoggedIn()) {
    $user_id = $_POST["userId"];

    echo json_encode(User::getPublicProfile($user_id));
}

?>
