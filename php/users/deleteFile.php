<?php
require_once '../class/Auth.php';
require_once '../class/User.php';

if (Auth::isLoggedIn()) {
    $params = json_decode(stripslashes(file_get_contents("php://input")));
    $fileId = $params->fileId;
    $user_id = Auth::getUserId();

    User::deleteFile($user_id, $fileId);
}

?>
