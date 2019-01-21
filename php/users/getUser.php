<?php
require_once '../class/User.php';
require_once '../class/Auth.php';
require_once '../class/Group.php';

if (Auth::isLoggedIn()) {
    $user_id = Auth::getUserId();
    $params = json_decode(stripslashes(file_get_contents("php://input")));
    $result = array();

    if (isset($params->profile)) {
        echo json_encode(User::getPublicProfile($params->userId));
        exit();
    }

    if (isset($params->receivedRequests)) {
        $result["receivedContactRequests"] = User::getReceivedContactRequests($user_id);
    }

    if (isset($_POST["name"])) {
        $result["name"] = User::getName($user_id);
    }

    if (isset($_POST["id"])) {
        $result["id"] = $user_id;
    }

    if (isset($_POST["picture"])) {
        $result["profilePicture"] = User::getProfilePicture($user_id)["profilePicture"];
    }

    if (isset($_POST["adminLevel"])) {
        $result["adminLevel"] = User::getAdminLevel($user_id)["adminLevel"];
    }

    echo json_encode($result);
} else {
    header("HTTP/1.0 401 Unauthorized");
    echo "Not logged in";
    exit();
}
?>
