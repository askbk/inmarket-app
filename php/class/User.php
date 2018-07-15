<?php
require_once 'DB.php';
/**
 * Class for User management
 */
class User
{
    //  inserts a new user into the database and returns the id.
    public static function insertUser($name, $email, $phone, $isAdmin, $isStudent, $isEmployee, $isPupil, $password, $kommuneNr)
    {
        $sql = "INSERT INTO user (name, email, phone, kommuneNr, isAdmin, password, createTime, isStudent, isEmployee, isPupil)
                VALUES ('$name', '$email', '$phone', '$kommuneNr', $isAdmin, '$password', NOW(), $isStudent, '$isEmployee', '$isPupil')";

        return DB::write($sql);
    }

    public static function userExists($user_id)
    {
        $sql = "SELECT *
                FROM user
                WHERE id=$user_id
                LIMIT 1";

        $result = DB::select($sql);

        if($result->num_rows > 0) {
            return true;
        }

        return false;
    }

    //  inserts a new employee into the database. if the specified company does not exist,
    //  then that is also inserted into the company table. returns the user_id of the employee.
    public static function insertEmployee($user_id, $position, $education, $companyName)
    {
        $companyId = self::getCompanyId($companyName);

        if($companyId == -1) {
            $companyId = self::insertCompany($companyName);
        }

        $sql = "INSERT INTO companyEmployee (user_id, position, education, company_id)
                VALUES ($user_id, '$position', '$education', $companyId)";

        return DB::write($sql);
    }

    //  inserts a new student into the database and returns the user_id.
    public static function insertStudent($user_id, $school, $schoolYear, $program)
    {
        $sql = "INSERT INTO student (user_id, school, schoolYear, program)
                VALUES ($user_id, '$school', '$schoolYear', '$program')";

        return DB::write($sql);
    }

    //  inserts a new pupil into the database and returns the user_id.
    public static function insertPupil($user_id, $school, $schoolYear, $program)
    {
        $sql = "INSERT INTO pupil (user_id, school, schoolYear, program)
                VALUES ($user_id, '$school', '$schoolYear', '$program')";

        return DB::write($sql);
    }

    //  deletes a user with the specified id.
    public static function deleteUser($user_id)
    {
        $sql = "DELETE FROM user
                WHERE id=$user_id";
        DB::write($sql);
    }

    //  returns user_id of the user with this email address if it exists.
    //  otherwise returns -1.
    public static function getUserId($email)
    {
        $sql = "SELECT id
                FROM user
                WHERE email='$email'
                LIMIT 1";

        $result = DB::select($sql);

        if($result->num_rows > 0) {
            return DB::returnResult($result)[0]['id'];
        }

        return -1;
    }

    public static function getUserPassword($user_id)
    {
        $sql = "SELECT password FROM user WHERE id='$user_id'";

        $result = DB::select($sql);

        if($result->num_rows > 0) {
            return DB::returnResult($result)[0]["password"];
        }

        return -1;
    }

    public static function getUserName($user_id)
    {
        $sql = "SELECT name FROM user WHERE id='$user_id'";

        $result = DB::select($sql);

        if($result->num_rows > 0) {
            return DB::returnResult($result)[0]["name"];
        }

        return -1;
    }

    public static function getUserEmail($user_id)
    {
        $sql = "SELECT email FROM user WHERE id='$user_id'";

        $result = DB::select($sql);

        if($result->num_rows > 0) {
            return DB::returnResult($result)[0]["email"];
        }

        return -1;
    }

    //  checks whether the user is an admin.
    public static function isAdmin($id)
    {
        $sql = "SELECT isAdmin
                FROM user
                WHERE id=$id,isAdmin=1";

        return DB::select($sql)->num_rows > 0;
    }

    public static function setProfilePicture($user_id, $picturePath)
    {
        $sql = "UPDATE user
                SET profilePicture='$picturePath'
                WHERE id=$user_id";

        DB::write($sql);
    }
}


?>
