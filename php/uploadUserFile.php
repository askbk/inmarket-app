<?php
require_once 'class/Auth.php';
require_once 'class/User.php';

if (Auth::isLoggedIn()) {
    $user_id = Auth::getUserId();

    if (isset($_FILES['file'])) {
        if ( isset($_POST["profilePicture"]) ) {
            $path = "../img/profile/";

            if (!is_dir($path . $user_id)) {
                echo mkdir($path . $user_id);
            }

            $path = $path . $user_id . "/" . $_FILES['file']['name'];
            move_uploaded_file($_FILES['file']['tmp_name'], $path);

            $path = "img/profile/" . $user_id . "/" . $_FILES['file']['name'];

            User::setProfilePicture($user_id, $path);
        } else {
            $path = "../data/";

            if (!is_dir($path . $user_id)) {
                mkdir($path . $user_id);
            }

            $path = $path . $user_id . "/" . $_FILES['file']['name'];
            move_uploaded_file($_FILES['file']['tmp_name'], $path);

            $path = "data/" . $user_id . "/" . $_FILES['file']['name'];

            $id = User::insertFile($user_id, $path);
            $name = preg_replace('/.*\//', '', $path);

            $data = array('id' => $id, 'name' => $name, 'path' => $path);

            echo json_encode($data);
        }
    }
}
?>
