<?php
require_once 'class/User.php';

if (isset($_POST["registration"])) {
    if (isset($_POST["email"])) {
        if (User::getUserId($_POST["email"]) != -1) {
            echo "true";
        } else {
            echo "false";
        }
    } elseif (isset($_POST["phone"])) {
        if (User::getUserByPhone($_POST["phone"]) != -1) {
            echo "true":
        } else {
            echo "false";
        }
    }
}

?>
