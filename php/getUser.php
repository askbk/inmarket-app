<?php
require_once 'class/User.php';
require_once 'class/Auth.php';

$name = $_POST["name"];
$picture = $_POST["picture"];
$id = $_POST["id"];
$type = $_POST["type"];

if (Auth::isLoggedIn()) {
    $user_id = Auth::getUserId();
    $result = array();
    
    if (isset($_POST["name"])) {
        $result["name"] = User::getUserName($user_id);
    }
    if (isset($_POST["id"])) {
        $result["id"] = $user_id;
    }
    if (isset($_POST["type"])) {
        $result["type"] = User::getUserType($user_id);
    }
    if (isset($_POST["picture"])) {
        $result["picture"] = User::getProfilePicture($user_id);
    }

    echo json_encode($result);
} else {
    header("HTTP/1.0 401 Unauthorized");
    echo "Not logged in";
    exit();
}
?>
