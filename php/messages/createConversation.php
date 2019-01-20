<?php
require_once 'class/Auth.php';
require_once 'class/User.php';
require_once 'class/Message.php';

if (Auth::isLoggedIn()) {
    $user_id = Auth::getUserId();

    if (User::getAdminLevel($user_id) > 0) {
        if (isset($_POST["name"])) {
            Message::createConversation($user_id, $_POST["name"], 0);
        }
    }
}
?>
