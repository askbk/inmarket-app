<?php
require_once 'class/Auth.php';

if (Auth::isLoggedIn()) {
    echo "helo!";
} else {
    header("HTTP/1.0 401 Unauthorized");
    echo "Not logged in";
}
?>
