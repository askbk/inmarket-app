<?php
require_once 'class/Auth.php';
require_once 'class/Company.php';
require_once 'class/Media.php';

if (Auth::isLoggedIn()) {
    $query = $_GET["q"];
}
?>
