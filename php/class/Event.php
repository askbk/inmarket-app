<?php
require_once 'DB.php';

/**
 * Class for event management
 */
class Event
{
    //  Returns all events in the specified area.
    public static function getEvents($area)
    {
        $sql = "SELECT event_id, dateTime, type, location
                FROM event
                WHERE location LIKE '$area'";

        return DB::returnArray(DB::select($sql));
    }

    //  Returns the event with the given id.
    public static function getEvent($id)
    {
        $sql = "SELECT location, dateTime, description, company_id, duration,
                    companyPicture_id, price, type
                FROM event
                WHERE event_id = $id";

        return DB::returnArray(DB::select($sql));
    }

    //  Inserts a new event into the database.
    public static function insertEvent($location, $dateTime, $description,
                                        $company_id, $duration, $price, $type)
    {
        $sql = "INSERT INTO event (location, dateTime, description,
                    company_id, duration, price, type)
                VALUES ('$location', CAST('" . $dateTime . "' AS DATETIME),
                    '$description', $company_id, '$duration', '$price',
                    '$type')";

        return DB::write($sql);
    }

    //  Sets the event picture. If the picture does not exist in the
    //  companyPictures table, it is inserted there first.
    public static function setEventPicture($company_id, $picturePath)
    {
        $pictureId = getPictureId($picturePath);

        if($pictureId == -1) {
            $pictureId = insertCompanyPicture($companyId, $picturePath);
        }

        $sql = "UPDATE event
                SET companyPicture_id = $pictureId
                WHERE company_id = $companyId";

        DB::write($sql);
    }
}

?>
