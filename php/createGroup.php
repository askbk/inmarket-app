<?php
require_once 'class/Auth.php';
require_once 'class/Group.php';
require_once 'class/User.php';

if (Auth::isLoggedIn()) {
    $userId = Auth::getUserId();

    if (User::getAdminLevel($userId) > 0) {
        $name = $_POST["name"];
        $description = $_POST["description"];
        $groupId = Group::createGroup($name, $description);
        Group::addMember($groupId, $userId, 1);
    }
}
?>
