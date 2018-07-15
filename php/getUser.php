<?php
require_once 'class/User.php';
require_once 'class/Auth.php';

$name = $_GET["name"];
$picture = $_GET["picture"];

if (True) {
    $result =
} else {
    header("HTTP/1.0 401 Unauthorized");
    echo "Not logged in";
    exit();
}
?>
