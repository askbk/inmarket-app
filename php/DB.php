<?php
require_once 'Config.php';
/**
 * connection class for database
 */
class DB
{
    private static $_conn;
    private static $_servername = "localhost";
    private static $_username = "ask";
    private static $_password = "123";
    private static $_dbname = "mydb";

    //--------------------------------------------------------------------------
    //                              USER OPERATIONS
    //--------------------------------------------------------------------------

    //  inserts a new user into the database and returns the id.
    public static function insertUser($name, $email, $phone, $isAdmin, $isStudent, $isEmployee, $isPupil, $password, $kommuneNr)
    {
        $sql = "INSERT INTO user (name, email, phone, kommuneNr, isAdmin, password, createTime, isStudent, isEmployee, isPupil)
                VALUES ('$name', '$email', '$phone', '$kommuneNr', $isAdmin, '$password', NOW(), $isStudent, '$isEmployee', '$isPupil')";

        return self::write($sql);
    }

    //  inserts a new employee into the database. if the specified company does not exist,
    //  then that is also inserted into the company table. returns the user_id of the employee.
    public static function insertEmployee($user_id, $position, $education, $companyName)
    {
        $companyId = getCompanyId($companyName);

        if($companyId == -1) {
            $companyId = insertCompany($companyName);
        }

        $sql = "INSERT INTO companyEmployee (user_id, position, education, company_id)
                VALUES ($user_id, '$position', '$education', $companyId)";

        return self::write($sql);
    }

    //  inserts a new student into the database and returns the user_id.
    public static function insertStudent($user_id, $school, $schoolYear, $program)
    {
        $sql = "INSERT INTO student (user_id, school, schoolYear, program)
                VALUES ($user_id, '$school', '$schoolYear', '$program')";

        return self::write($sql);
    }

    //  inserts a new pupil into the database and returns the user_id.
    public static function insertPupil($user_id, $school, $schoolYear, $program)
    {
        $sql = "INSERT INTO pupil (user_id, school, schoolYear, program)
                VALUES ($user_id, '$school', '$schoolYear', '$program')";

        return self::write($sql);
    }

    //  deletes a user with the specified id.
    public static function deleteUser($user_id)
    {
        $sql = "DELETE FROM user
                WHERE id=$user_id";
        self::write($sql);
    }

    //  returns user_id of the user with this email address if it exists.
    //  otherwise returns -1.
    public static function getUserId($email)
    {
        $sql = "SELECT id FROM user WHERE email='$email'";

        $result = self::select($sql);

        if($result->num_rows > 0) {
            return self::returnResult($result)[0]['id'];
        }

        return -1;
    }

    public static function getUserPassword($user_id)
    {
        $sql = "SELECT password FROM user WHERE id='$user_id'";

        $result = self::select($sql);

        if($result->num_rows > 0) {
            return self::returnResult($result)[0]["password"];
        }

        return -1;
    }

    public static function getUserEmail($user_id)
    {
        $sql = "SELECT email FROM user WHERE id='$user_id'";

        $result = self::select($sql);

        if($result->num_rows > 0) {
            return self::returnResult($result)[0]["email"];
        }

        return -1;
    }

    //  checks whether the user is an admin.
    public static function isAdmin($id)
    {
        $sql = "SELECT isAdmin
                FROM user
                WHERE id=$id,isAdmin=1";

        return self::select($sql)->num_rows > 0;
    }

    public static function setProfilePicture($user_id, $picturePath)
    {
        $sql = "UPDATE user
                SET profilePicture='$picturePath'
                WHERE id=$user_id";

        self::write($sql);
    }

    //--------------------------------------------------------------------------
    //                          COMPANY OPERATIONS
    //--------------------------------------------------------------------------

    //  inserts a new company into the database and returns the id.
    public static function insertCompany($companyName, $companyDescription = '')
    {
        $sql = "INSERT INTO company (name, description)
                VALUES ('$companyName', '$companyDescription')";

        return self::write($sql);
    }

    //  checks whether a company with the specified name already exists.
    public static function companyExists($company)
    {
        return (self::getCompanyId($company) == -1) ? false : true;
    }

    //  returns the id of the company with the specified name if it exists, otherwise it returns -1.
    public static function getCompanyId($companyName)
    {
        $sql = "SELECT id
                FROM company
                WHERE name='$companyName'";

        $result = self::select($sql);

        if($result->num_rows > 0) {
            return self::returnResult($result)[0]['id'];
        }

        return -1;
    }

    //  adds a new picture to the company's picture collection
    public static function insertCompanyPicture($companyId, $picturePath, $description='')
    {
        $sql = "INSERT INTO companyPictures (path, company_id, description)
                VALUES ('$picturePath', $companyId, $description)";

        return self::write($sql);
    }

    //  sets the company logo.
    public static function setCompanyLogo($companyId, $picturePath)
    {
        $sql = "UPDATE company
                SET logo='$picturePath'
                WHERE id=$companyId";

        self::write($sql);
    }

    //  sets the company description.
    public static function setCompanyDescription($companyId, $description)
    {
        $sql = "UPDATE company
                SET description='$description'
                WHERE id=$companyId";

        self::write($sql);
    }

    //  returns all employees from the specified company
    public static function getCompanyEmployees($companyId)
    {
        $sql = "SELECT user.name, companyEmployee.position, companyEmployee.education
                FROM user
                INNER JOIN companyEmployee ON user.company_id = companyEmployee.company_id
                WHERE user.company_id=$companyId";

        return self::returnResult(self::select($sql));
    }

    public static function getCompanies()
    {
        $sql = "SELECT * FROM company";

        return self::returnResult(self::select($sql));
    }

    //--------------------------------------------------------------------------
    //                          EVENT OPERATIONS
    //--------------------------------------------------------------------------

    //  returns all events in the specified area.
    public static function getEvents($area)
    {
        $sql = "SELECT id,date,type,location
                FROM event
                WHERE location LIKE '$area'";

        return self::returnResult(self::select($sql));
    }

    //  returns the event with the given id.
    public static function getEvent($id)
    {
        $sql = "SELECT location,date,time,price,duration,description,companyPictures_id,companyPictures_company_id
                FROM event
                WHERE id=$id";

        return self::returnResult(self::select($sql));
    }

    //  inserts a new event into the database
    public static function insertEvent($location, $date, $time, $description, $company_id, $duration, $price, $type)
    {
        $sql = "INSERT INTO event (location, date, time, description, company_id, duration, price, type)
                VALUES ('$location', CAST('" . $date . "' AS DATE), '$time', '$description', $company_id, '$duration', '$price', '$type')";

        return self::write($sql);
    }

    //  sets the event picture. if the picture does not exist in the companyPictures
    //  table, it is inserted there first.
    public static function setEventPicture($company_id, $picturePath)
    {
        $pictureId = getPictureId($picturePath);

        if($pictureId == -1) {
            $pictureId = insertCompanyPicture($companyId, $picturePath);
        }

        $sql = "UPDATE event
                SET companyPictures_id=$pictureId
                WHERE company_id=$companyId";

        self::write($sql);
    }

    //--------------------------------------------------------------------------
    //                          MEDIA OPERATIONS
    //--------------------------------------------------------------------------

    //  returns the id of the picture with the specified path if it exists, otherwise it returns -1.
    public static function getPictureId($picturePath)
    {
        $sql = "SELECT id FROM companyPictures WHERE path='$picturePath'";
        $result = self::select($sql);

        if($result->num_rows > 0) {
            return self::returnResult($result)[0]['id'];
        }

        return -1;
    }

    //  inserts a new video with the specified properties and returns the video id.
    public static function insertVideo($companyId, $videoPath, $title, $description)
    {
        $sql = "INSERT INTO companyVideos (videoPath, title, description, company_id)
                VALUES ('$videoPath', '$title', '$description', $companyId)";

        return self::write($sql);
    }

    //--------------------------------------------------------------------------
    //                      LOW LEVEL DATABASE OPERATIONS
    //--------------------------------------------------------------------------

    //  opens database connection.
    private static function connect()
    {
        self::$_conn = new mysqli(self::$_servername, self::$_username, self::$_password, self::$_dbname);

        self::$_conn->set_charset('utf8mb4');

        if (self::$_conn->connect_error) {
            die("Connection failed: " . self::$_conn->connect_error);
        }
    }

    //  closes database connection.
    private static function closeConnection()
    {
        self::$_conn->close();
    }

    //  performs an INSERT, UPDATE or DELETE sql query. returns the id of the row.
    private static function write($sql)
    {
        self::connect();

        if(self::$_conn->query($sql) === TRUE) {
            self::closeConnection();
            return self::$_conn->insert_id;;
        }

        self::select($sql, self::$_conn->error);

        self::closeConnection();
    }

    //  returns the result of an sql select query
    private static function select($sql)
    {
        self::connect();
        $result = self::$_conn->query($sql) or die(self::$_conn->error);
        self::closeConnection();

        return $result;
    }

    //  prints errors
    private static function printError($query, $error)
    {
        echo "Error: " . $query . "<br>" . $error;
    }

    //  takes sql query result object as argument and returns it as a nested array.
    //  the inner array is associative with attribute names as the keys, while
    //  the outer array is an index array.
    private static function returnResult($result)
    {
        $resultArray = array();
        $index = 0;

        while($row = $result->fetch_assoc()){
            $resultArray[$index] = $row;
            $index++;
        }

        return $resultArray;
    }
}
?>
