<?php
require_once 'Config.php';
/**
 * connection class for database
 */
class DB
{
    public static $_conn;
    public static $_servername = "localhost";
    public static $_username = "ask";
    public static $_password = "123";
    public static $_dbname = "mydb";

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
    public static function connect()
    {
        self::$_conn = new mysqli(self::$_servername, self::$_username, self::$_password, self::$_dbname);

        self::$_conn->set_charset('utf8mb4');

        if (self::$_conn->connect_error) {
            die("Connection failed: " . self::$_conn->connect_error);
        }
    }

    //  closes database connection.
    public static function closeConnection()
    {
        self::$_conn->close();
    }

    //  performs an INSERT, UPDATE or DELETE sql query. returns the id of the row.
    public static function write($sql)
    {
        self::connect();

        if(self::$_conn->query($sql) === TRUE) {
            $id = self::$_conn->insert_id;
            self::closeConnection();
            return $id;
        }

        self::select($sql, self::$_conn->error);

        self::closeConnection();
    }

    //  returns the result of an sql select query
    public static function select($sql)
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
    //  the outer array is an indexed array.
    public static function returnResult($result)
    {
        $resultArray = array();
        $index = 0;

        while($row = $result->fetch_assoc()){
            $resultArray[$index] = $row;
            $index++;
        }

        return $resultArray;
    }

    public static function returnValue($result)
    {
        return $result->fetch_assoc();
    }
}
?>
