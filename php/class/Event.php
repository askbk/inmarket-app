<?php
require_once 'DB.php';

/**
 * Class for event management
 */
class Event
{
    //  returns all events in the specified area.
    public static function getEvents($area)
    {
        $sql = "SELECT id,date,type,location
                FROM event
                WHERE location LIKE '$area'";

        return DB::returnResult(DB::select($sql));
    }

    //  returns the event with the given id.
    public static function getEvent($id)
    {
        $sql = "SELECT location,date,time,description,company_id,duration,companyPictures_id,price,type
                FROM event
                WHERE id=$id";

        return DB::returnResult(DB::select($sql));
    }

    //  inserts a new event into the database
    public static function insertEvent($location, $date, $time, $description, $company_id, $duration, $price, $type)
    {
        $sql = "INSERT INTO event (location, date, time, description, company_id, duration, price, type)
                VALUES ('$location', CAST('" . $date . "' AS DATE), '$time', '$description', $company_id, '$duration', '$price', '$type')";

        return DB::write($sql);
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

        DB::write($sql);
    }
}

?>
