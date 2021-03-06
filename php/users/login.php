<?php
require_once '../class/Config.php';
require_once '../class/Auth.php';

$email = $_POST["email"];
$password = $_POST["password"];

$user_id = Auth::validateCredentials($email, $password);

if (!$user_id) {
    header("HTTP/1.0 401 Unauthorized");
    error();
} else {
    echo Auth::issueToken($user_id);
    exit();
}

function error()
{
    echo "Error: invalid credentials";
    exit();
}

?>
