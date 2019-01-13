<?php
require_once 'class/User.php';

if (isset($_POST["email"])) {
    if (User::getId($_POST["email"]) != -1) {
        echo "true";
    } else {
        echo "false";
    }
} elseif (isset($_POST["phone"])) {
    if (User::getByPhone($_POST["phone"]) != -1) {
        echo "true";
    } else {
        echo "false";
    }
}

?>
