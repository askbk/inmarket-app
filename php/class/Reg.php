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
        $user_id = User::insert($user["name"], $user["email"],
                                    $user["phone"], 0, $user["userType"],
                                    $password, $user["kommuneNr"]);

        if ($user["userType"] == 0) {                   //  Student
            self::registerStudent($user_id, $user);
        } else if ($user["userType"] == 1) {            //  Jobseeker
            self::registerJobseeker($user_id, $user);
        } else if ($user["userType"] == 2) {            // Employee
            self::registerEmployee($user_id, $user);
        }

        return $user_id;

    }

    // Methods for registering different types of clients.

    private static function registerStudent($user_id, $student)
    {
        User::insertStudent($user_id, $student["school"],
                            $student["schoolYear"], $student["program"]);
    }

    private static function registerJobseeker($user_id, $jobseeker)
    {
        User::insertJobseeker($user_id);
    }

    private static function registerEmployee($user_id, $employee)
    {
        User::insertEmployee($user_id, $employee);
    }
}

?>
