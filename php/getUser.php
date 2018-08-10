<?php
require_once 'class/User.php';
require_once 'class/Auth.php';

$name = $_POST["name"];
$picture = $_POST["picture"];
$id = $_POST["id"];
// $type = $_POST["type"];

if (Auth::isLoggedIn()) {
    $user_id = Auth::getUserId();
    $result = array();
    if ($name == 1) {
        $result[] = User::getUserName($user_id);
    }
    if ($id == 1) {
        $result[] = $user_id;
    }

    echo json_encode($result);
} else {
    header("HTTP/1.0 401 Unauthorized");
    echo "Not logged in";
    exit();
}
?>
