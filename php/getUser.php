<?php
require_once 'class/User.php';
require_once 'class/Auth.php';
require_once 'class/Group.php';

if (Auth::isLoggedIn()) {
    $user_id = Auth::getUserId();
    $result = array();
    if (isset($_POST["profile"])) {
        echo json_encode(User::getPublicProfile($_POST["userId"]));
        exit();
    }
    if (isset($_POST["fileList"])) {
        echo json_encode(User::getUserFiles($_POST["userId"]));
        exit();
    }
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
        $result[] = User::getProfilePicture($user_id);
    }
    if (isset($_POST["thumb"])) {
        $result["thumb"] = User::getProfileThumb($user_id);
    }
    if (isset($_POST["adminLevel"])) {
        $result["adminLevel"] = User::getAdminLevel($user_id)["adminLevel"];
    }
    if (isset($_POST["adminGroups"])) {
        $queryResult = Group::getList($user_id, true, false);

        $groupIds = array();

        foreach ($queryResult as $row) {
            $groupIds[] = $row["group_id"];
        }

        $result["adminGroups"] = $groupIds;
    }

    echo json_encode($result);
} else {
    header("HTTP/1.0 401 Unauthorized");
    echo "Not logged in";
    exit();
}
?>
