<?php
require_once 'class/Auth.php';
require_once 'class/Group.php';
require_once 'class/User.php';

if (Auth::isLoggedIn()) {
    $user_id = Auth::getUserId();

    if (User::getAdminLevel($user_id) > 0) {
        echo json_encode(Group::getAdminGroups($user_id));

        // $groups = array();
        //
        // foreach ($queryResult as $row) {
        //     $groupIds[] = $row["group_id"];
        // }
        //
        // echo json_encode($groupIds);
    }
}

?>
