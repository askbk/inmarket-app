<?php
require_once 'DB.php';

/**
 * Class for company management
 */
class Company
{
    //  inserts a new company into the database and returns the id.
    public static function insertCompany($companyName, $companyDescription = '')
    {
        $sql = "INSERT INTO company (name, description)
                VALUES ('$companyName', '$companyDescription')";

        return DB::write($sql);
    }

    //  checks whether a company with the specified name already exists.
    public static function companyExists($company = '', $id = '')
    {
        if ($id == '') {
            return (self::getCompanyId($company) == -1) ? false : true;
        } elseif ($company == '') {
            return (self::getCompany($id) == -1) ? false : true;
        }

        return -1;
    }

    //  returns the id of the company with the specified name if it exists, otherwise it returns -1.
    public static function getCompanyId($companyName)
    {
        $sql = "SELECT id
                FROM company
                WHERE name='$companyName'";

        $result = DB::select($sql);

        if($result->num_rows > 0) {
            return DB::returnResult($result)[0]['id'];
        }

        return -1;
    }

    public static function getCompany($companyId)
    {
        $sql = "SELECT *
                FROM company
                WHERE id=$companyId";

        $result = DB::select($sql);

        if($result->num_rows > 0) {
            return DB::returnResult($result)[0];
        }

        return -1;
    }

    //  adds a new picture to the company's picture collection
    public static function insertCompanyPicture($companyId, $picturePath, $description='')
    {
        $sql = "INSERT INTO companyPictures (path, company_id, description)
                VALUES ('$picturePath', $companyId, $description)";

        return DB::write($sql);
    }

    //  sets the company logo.
    public static function setCompanyLogo($companyId, $picturePath)
    {
        $sql = "UPDATE company
                SET logo='$picturePath'
                WHERE id=$companyId";

        DB::write($sql);
    }

    //  sets the company description.
    public static function setCompanyDescription($companyId, $description)
    {
        $sql = "UPDATE company
                SET description='$description'
                WHERE id=$companyId";

        DB::write($sql);
    }

    //  returns all employees from the specified company
    public static function getCompanyEmployees($companyId)
    {
        $sql = "SELECT user.name, companyEmployee.position, companyEmployee.education
                FROM user
                INNER JOIN companyEmployee ON user.id = companyEmployee.user_id
                WHERE companyEmployee.company_id=$companyId";

        return DB::returnResult(DB::select($sql));
    }

    public static function getCompanies()
    {
        $sql = "SELECT * FROM company";

        return DB::returnResult(DB::select($sql));
    }
}

?>
