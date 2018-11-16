<?php
require_once 'DB.php';
require_once 'Company.php';
require_once 'Image.php';
/**
 * Class for User management
 */
class User
{
    //  Inserts a new user into the database and returns the id.
    public static function insertUser($name, $email, $phone, $adminLevel,
                                        $userType, $password, $kommuneNr)
    {
        $sql = "INSERT INTO user (name, email, phone, kommuneNr, adminLevel,
                    password, createTime, userType, profilePicture)
                VALUES ('$name', '$email', '$phone', '$kommuneNr', 0,
                    '$password', NOW(), $userType, 'img/stock-profile.jpg')";

        return DB::write($sql);
    }

    //  Checks if a user with the given ID exists.
    public static function exists($user_id)
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

    // TODO: This method is no longer needed. Rewrite to fit a different type of
    //  client.
    //  Inserts a new employee into the database. if the specified company does
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

    //  Inserts a new student into the database and returns the ID
    public static function insertStudent($user_id, $school, $schoolYear,
                                            $program)
    {
        $sql = "INSERT INTO student (user_id, school, schoolYear, program)
                VALUES ($user_id, '$school', '$schoolYear', '$program')";

        return DB::write($sql);
    }

    //  Inserts a new pupil into the database and returns the user_id.
    public static function insertPupil($user_id, $school, $schoolYear, $program)
    {
        $sql = "INSERT INTO pupil (user_id, school, schoolYear, program)
                VALUES ($user_id, '$school', '$schoolYear', '$program')";

        return DB::write($sql);
    }

    //  Deletes a user with the specified id.
    public static function deleteUser($user_id)
    {
        $sql = "DELETE FROM user
                WHERE user_id = $user_id";
        DB::write($sql);
    }

    //  Returns user_id of the user with this email address if it exists.
    //  Otherwise it returns -1.
    public static function getUserId($email)
    {
        $sql = "SELECT user_id
                FROM user
                WHERE email = '$email'
                LIMIT 1";

        $result = DB::select($sql);

        if($result->num_rows > 0) {
            return DB::returnValue($result)['user_id'];
        }

        return -1;
    }

    //  Returns the user_id of the user with this phone number if it exists.
    //  Otherwise it returns -1.
    public static function getUserByPhone($phone)
    {
        $sql = "SELECT user_id
                FROM user
                WHERE phone = '$phone'
                LIMIT 1";

        $result = DB::select($sql);

        if($result->num_rows > 0) {
            return DB::returnValue($result)['user_id'];
        }

        return -1;
    }

    //  Returns the hashed and salted version of the user's password.
    public static function getUserPassword($user_id)
    {
        $sql = "SELECT password
                FROM user
                WHERE user_id = $user_id";

        $result = DB::select($sql);

        if($result->num_rows > 0) {
            return DB::returnArray($result)[0]["password"];
        }

        return -1;
    }

    //  Returns the name of a given user.
    public static function getUserName($user_id)
    {
        $sql = "SELECT name
                FROM user
                WHERE user_id = '$user_id'";

        $result = DB::select($sql);

        if($result->num_rows > 0) {
            return DB::returnArray($result)[0]["name"];
        }

        return -1;
    }

    //  Returns the email of the given user.
    public static function getUserEmail($user_id)
    {
        $sql = "SELECT email
                FROM user
                WHERE user_id = '$user_id'";

        $result = DB::select($sql);

        if($result->num_rows > 0) {
            return DB::returnArray($result)[0]["email"];
        }

        return -1;
    }

    //  Returns the user type of a given user.
    public static function getUserType($user_id)
    {
        $sql = "SELECT userType
                FROM user
                WHERE user_id = $user_id";

        return DB::returnValue(DB::select($sql))["userType"];
    }

    //  Checks admin level of a given user.
    //  0 - ordinary user
    //  1 - volunteer
    //  5 - InMarket employee
    // 10 - administrator
    public static function getAdminLevel($id)
    {
        $sql = "SELECT adminLevel
                FROM user
                WHERE user_id = $id";

        return DB::returnValue(DB::select($sql));
    }

    // Updates the profile picture of the user.
    public static function setProfilePicture($user_id, $picturePath)
    {
        $path = Image::adaptImage($picturePath);

        $sql = "UPDATE user
                SET profilePicture = '$path'
                WHERE user_id = $user_id";

        DB::write($sql);

        return $path;
    }

    // Updates the biography of the user.
    public static function updateBio($bio, $user_id)
    {
        $sql = "UPDATE user
                SET biography = '$bio'
                WHERE user_id = $user_id";

        return DB::write($sql);
    }

    // Returns the path to the profile picture of the user.
    public static function getProfilePicture($user_id)
    {
        $sql = "SELECT profilePicture
                FROM user
                WHERE user_id = $user_id";

        return DB::returnValue(DB::select($sql));
    }

    //  Returns the thumbnail of the profile picture of the user.
    public static function getProfileThumb($user_id)
    {
        $sql = "SELECT profilePictureThumb
                FROM user
                WHERE user_id = $user_id";

        return DB::returnValue(DB::select($sql));
    }

    // Returns all public details of the user.
    // TODO:  $user should not be an array.
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
                        WHERE user_id = $user_id";

                $user[] = DB::returnValue(DB::select($sql));
                break;
        }



        $user[] = self::getUserFiles($user_id);

        $user[0]["userType"] = $userType;

        return $user;
    }

    //  Retrieves the list of files that a user has uploaded
    public static function getUserFiles($user_id)
    {
        $sql = "SELECT userFile_id, path, description, name
                FROM userFile
                WHERE user_id = $user_id";

        return DB::returnArray(DB::select($sql));
    }

    //  Inserts a new file belonging to the given user.
    public static function insertFile($user_id, $file_path, $description = '')
    {
        $name = preg_replace('/.*\//', '', $file_path);

        $sql = "INSERT INTO userFile (path, description, user_id, name)
                VALUES ('$file_path', '$description', $user_id, '$name')";

        return DB::write($sql);
    }

    //  Removes the given file from the database.
    //  TODO: Files should also be deleted from the server.
    public static function deleteFile($user_id, $userFile_id)
    {
        $sql = "DELETE FROM userFile
                WHERE userFile_id = $userFile_id
                    AND user_id = $user_id";

        return DB::write($sql);
    }

    //  Searches database for user matching the query
    public static function search($string, $limit)
    {
        $sql = "SELECT user_id, name, profilePicture, email
                FROM user
                WHERE name LIKE '%$string%'
                    OR email LIKE '%$string%'
                LIMIT 5";

        return DB::returnArray(DB::select($sql));
    }
}


?>
