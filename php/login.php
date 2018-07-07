<?php
include 'DB.php';

$email = $_POST["email"];
$password = $_POST["password"];

$user_id = DB::getUserId($email);

if ($user_id == -1) {
    error();
}

if (password_verify($password, DB::getUserPassword($user_id))) {
    //  do something
} else {
    error();
}

public function error()
{
    echo "Error: this email/password combination does not exist.";
    return;
}

?>
