<?php
require_once 'class/Auth.php';
require_once 'class/Group.php';

if (Auth::isLoggedIn()) {
    if (!isset($_POST["groupId"])) {
        $user_id = Auth::getUserId();
        $adminGroups = isset($_POST["adminGroups"]);

        $groupList = Group::getList($user_id, $adminGroups);

        echo json_encode($groupList);
        exit();
    }

    $user_id = Auth::getUserId();
    $groupId = $_POST["groupId"];

    $result = array();
    if (isset($_POST["members"])) {
        $result["members"] = Group::getMembers($groupId);
        foreach ($result["members"] as $key => $member) {
            if ($member["profilePicture"] == NULL) {
                $result["members"][$key]["profilePicture"] = "img/stock-profile.jpg";
            }
        }
    }
    if (isset($_POST["details"])) {
        $result["details"] = Group::getDetails($groupId);
    }

    echo json_encode($result);
}

?>
