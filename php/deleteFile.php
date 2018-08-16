<?php
require_once 'class/Auth.php';
require_once 'class/User.php';

if (Auth::isLoggedIn()) {
    $user_id = Auth::getUserId();
    $fileId = $_POST["userFile_id"];

    User::deleteFile($user_id, $fileId);
}

?>
