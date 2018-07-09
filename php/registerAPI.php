<?php
include 'DB.php';

/**
 * Static class for handling registration
 */
class Reg
{
    public static function registerUser($user)
    {
        $password = password_hash($user["password"], PASSWORD_DEFAULT);
        $user_id = DB::insertUser($user["name"], $user["email"], $user["phone"], 0, $user["isStudent"], $user["isEmployee"], $user["isPupil"], $password, $user["kommuneNr"]);

        if ($user["isStudent"]) {
            self::registerStudent($user_id, $user);
        } else if ($user["isEmployee"]) {
            self::registerEmployee($user_id, $user);
        } else if ($user["isPupil"]) {
            self::registerPupil($user_id, $user);
        }

        return $user_id;

    }

    private static function registerStudent($user_id, $student)
    {
        DB::insertStudent($user_id, $student["school"], $student["schoolYear"], $student["program"]);
    }

    private static function registerEmployee($user_id, $employee)
    {
        DB::insertEmployee($user_id, $employee["position"], $employee["education"], $employee["companyName"]);
    }

    private static function registerPupil($user_id, $pupil)
    {
        DB::insertStudent($user_id, $pupil["school"], $pupil["schoolYear"], $pupil["program"]);
    }


}

?>
