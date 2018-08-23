<?php
require_once 'class/Auth.php';
require_once 'class/User.php';

if (Auth::isLoggedIn()) {
    $query = $_POST["query"];

    echo json_encode(User::search($query));
}
?>
