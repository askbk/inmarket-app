<?php
require_once 'DB.php';
require_once 'Company.php';
/**
 * Class for User management
 */
class User
{
    //  inserts a new user into the database and returns the id.
    public static function insertUser($name, $email, $phone, $adminLevel,
                                        $isStudent, $isNEET, $isPupil,
                                        $password, $kommuneNr)
    {
        $sql = "INSERT INTO user (name, email, phone, kommuneNr, adminLevel,
                    password, createTime, isStudent, isNEET, isPupil)
                VALUES ('$name', '$email', '$phone', '$kommuneNr', 0,
                    '$password', NOW(), $isStudent, '$isNEET', '$isPupil')";

        return DB::write($sql);
    }

    public static function userExists($user_id)
    {
        $sql = "SELECT *
                FROM user
                WHERE user_id = $user_id
                LIMIT 1";

        $result = DB::select($sql);

        if($result->num_rows > 0) {
            return true;
        }

        return false;
    }

    //  inserts a new employee into the database. if the specified company does
    //  not exist, then that is also inserted into the company table. returns
    //  the user_id of the employee.
    public static function insertEmployee($user_id, $position, $education,
                                            $companyName)
    {
        $companyId = Company::getCompanyId($companyName);

        if($companyId == -1) {
            $companyId = Company::insertCompany($companyName);
        }

        $sql = "INSERT INTO companyEmployee (user_id, position, education,
                    company_id)
                VALUES ($user_id, '$position', '$education', $companyId)";

        return DB::write($sql);
    }

    //  inserts a new student into the database and returns the user_id.
    public static function insertStudent($user_id, $school, $schoolYear,
                                            $program)
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
                WHERE user_id = $user_id";
        DB::write($sql);
    }

    //  returns user_id of the user with this email address if it exists.
    //  otherwise returns -1.
    public static function getUserId($email)
    {
        $sql = "SELECT user_id
                FROM user
                WHERE email = '$email'
                LIMIT 1";

        $result = DB::select($sql);

        if($result->num_rows > 0) {
            return DB::returnResult($result)[0]['user_id'];
        }

        return -1;
    }

    public static function getUserPassword($user_id)
    {
        $sql = "SELECT password
                FROM user
                WHERE user_id = $user_id";

        $result = DB::select($sql);

        if($result->num_rows > 0) {
            return DB::returnResult($result)[0]["password"];
        }

        return -1;
    }

    public static function getUserName($user_id)
    {
        $sql = "SELECT name
                FROM user
                WHERE user_id = '$user_id'";

        $result = DB::select($sql);

        if($result->num_rows > 0) {
            return DB::returnResult($result)[0]["name"];
        }

        return -1;
    }

    public static function getUserEmail($user_id)
    {
        $sql = "SELECT email
                FROM user
                WHERE user_id = '$user_id'";

        $result = DB::select($sql);

        if($result->num_rows > 0) {
            return DB::returnResult($result)[0]["email"];
        }

        return -1;
    }

    public static function getUserType($user_id)
    {
        $sql = "SELECT isPupil, isStudent
                FROM user
                WHERE user_id = $user_id";

        $result = DB::returnValue(DB::select($sql));

        if ($result["isPupil"] == 1) {
            return 0;
        } else if ($result["isStudent"] == 1) {
            return 1;
        } else {
            return 2;
        }
    }

    //  checks admin level of user
    public static function getAdminLevel($id)
    {
        $sql = "SELECT adminLevel
                FROM user
                WHERE user_id = $id";

        return DB::returnValue(DB::select($sql));
    }

    public static function setProfilePicture($user_id, $picturePath)
    {
        $sql = "UPDATE user
                SET profilePicture='$picturePath'
                WHERE user_id = $user_id";

        return DB::write($sql);
    }

    public static function getProfilePicture($user_id)
    {
        $sql = "SELECT profilePicture
                FROM user
                WHERE user_id = $user_id";

        return DB::returnValue(DB::select($sql));
    }

    public static function getPublicProfile($user_id)
    {
        $userType = self::getUserType($user_id);
        $user = array();

        switch ($userType) {
            case 0:
                $sql = "SELECT user.name, user.profilePicture, user.createTime,
                                user.biography, pupil.school, pupil.schoolYear,
                                pupil.program
                        FROM user
                        INNER JOIN pupil
                            ON user.user_id = pupil.user_id
                        WHERE user.user_id = $user_id";

                $user[] = DB::returnValue(DB::select($sql));
                break;
            case 1:
                $sql = "SELECT user.name, user.profilePicture, user.createTime,
                                user.biography, student.school,
                                student.schoolYear, student.program
                        FROM user
                        INNER JOIN student
                            ON user.user_id = student.user_id
                        WHERE user.user_id = $user_id";

                $user[] = DB::returnValue(DB::select($sql));
                break;
            case 2:
                $sql = "SELECT user.name, user.profilePicture, user.createTime,
                                user.biography
                        FROM user
                        WHERE u.user_id = $user_id";

                $user[] = DB::returnValue(DB::select($sql));
                break;
            default:
                // code...
                break;
        }

        $sql = "SELECT userFile_id, path, description
                FROM userFile
                WHERE user_id = $user_id";

        $user[] = DB::returnResult(DB::select($sql));

        $user[0]["userType"] = $userType;

        return $user;
    }

    public static function insertFile($user_id, $file_path, $description = '')
    {
        $sql = "INSERT INTO userFile (path, description, user_id)
                VALUES ('$file_path', '$description', $user_id)";

        return DB::write($sql);
    }
}


?>
