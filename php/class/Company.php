<?php
require_once 'DB.php';

/**
 * Class for company management
 */
class Company
{
    //  Inserts a new company into the database and returns the id.
    public static function insert($companyName, $companyDescription = '')
    {
        $sql = "INSERT INTO company (name, description)
                VALUES ('$companyName', '$companyDescription')";

        return DB::write($sql);
    }

    //  Checks whether a company with the specified name already exists.
    public static function exists($company = '', $id = '')
    {
        if ($id == '') {
            return (self::getCompanyId($company) == -1) ? false : true;
        } elseif ($company == '') {
            return (self::getCompany($id) == -1) ? false : true;
        }

        return -1;
    }

    //  Returns the id of the company with the specified name if it exists,
    //  otherwise it returns -1.
    public static function getId($companyName)
    {
        $sql = "SELECT company_id
                FROM company
                WHERE name = '$companyName'";

        $result = DB::select($sql);

        if($result->num_rows > 0) {
            return DB::returnArray($result)[0]['id'];
        }

        return -1;
    }

    public static function get($companyId)
    {
        $sql = "SELECT *
                FROM company
                WHERE company_id = $companyId";

        $result = DB::select($sql);

        if($result->num_rows > 0) {
            return DB::returnArray($result)[0];
        }

        return -1;
    }

    //  Adds a new picture to the company's picture collection.
    public static function insertPicture($companyId, $picturePath,
                                                    $description='')
    {
        $sql = "INSERT INTO companyPicture (path, company_id, description)
                VALUES ('$picturePath', $companyId, $description)";

        return DB::write($sql);
    }

    //  Sets the company logo.
    public static function setLogo($companyId, $picturePath)
    {
        $sql = "UPDATE company
                SET logo = '$picturePath'
                WHERE company_id = $companyId";

        DB::write($sql);
    }

    //  Sets the company description.
    public static function setDescription($companyId, $description)
    {
        $sql = "UPDATE company
                SET description = '$description'
                WHERE company_id = $companyId";

        DB::write($sql);
    }

    //  Returns all employees from the specified company
    public static function getEmployees($companyId)
    {
        $sql = "SELECT user.name, companyEmployee.position,
                    companyEmployee.education
                FROM user
                INNER JOIN companyEmployee ON user.id = companyEmployee.user_id
                WHERE companyEmployee.company_id = $companyId";

        return DB::returnArray(DB::select($sql));
    }

    public static function getCompanies()
    {
        $sql = "SELECT * FROM company";

        return DB::returnArray(DB::select($sql));
    }
}

?>
