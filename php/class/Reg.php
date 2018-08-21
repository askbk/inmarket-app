<?php
require_once 'User.php';

/**
 * Static class for handling registration
 */
class Reg
{
    //  Registers a user.
    public static function registerUser($user)
    {
        $password = password_hash($user["password"], PASSWORD_DEFAULT);
        $user_id = User::insertUser($user["name"], $user["email"],
                                    $user["phone"], 0, $user["isStudent"],
                                    $user["isNEET"], $user["isPupil"],
                                    $password, $user["kommuneNr"]);

        if ($user["isStudent"]) {
            self::registerStudent($user_id, $user);
        } else if ($user["isNEET"]) {
            self::registerNeet($user_id, $user);
        } else if ($user["isPupil"]) {
            self::registerPupil($user_id, $user);
        }

        return $user_id;

    }

    // Methods for registering different types of clients.

    private static function registerStudent($user_id, $student)
    {
        User::insertStudent($user_id, $student["school"],
                            $student["schoolYear"], $student["program"]);
    }

    private static function registerNEET($user_id, $employee)
    {
        User::insertNEET($user_id, " "," "," ");
    }

    private static function registerPupil($user_id, $pupil)
    {
        User::insertPupil($user_id, $pupil["school"], $pupil["schoolYear"],
                            $pupil["program"]);
    }


}

?>
