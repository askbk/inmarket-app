<?php
header("Content-Type: application/json; charset=UTF-8");
require_once 'class/Reg.php';
$user_id = -1;

var_dump($_POST);
if (isValidEmail($_POST["email"])) {
    if (isValidPassword($_POST["password"])) {
        $user_id = Reg::registerUser($_POST);
    } else {
        echo "Invalid characters in password.";
        return false;
    }
} else {
    echo "Invalid characters in e-mail";
    return false;
}

function isValidPassword($string)
{
    return !preg_match("/\W/i", $string);
}

function isValidEmail($string)
{
    return filter_var($string, FILTER_VALIDATE_EMAIL);

}
 ?>
