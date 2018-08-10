<?php
require_once 'DB.php';

/**
 * Class for media queries
 */
class Media
{
    //  returns the id of the picture with the specified path if it exists,
    //  otherwise it returns -1.
    public static function getPictureId($picturePath)
    {
        $sql = "SELECT companyPicture_id
                FROM companyPicture
                WHERE path =  '$picturePath'
                LIMIT 1";

        $result = self::select($sql);
            if($result->num_rows > 0) {
            return self::returnResult($result)[0]['id'];
        }

        return -1;
    }

    //  inserts a new video with the specified properties and returns the video
    //  id.
    public static function insertVideo($companyId, $videoPath, $title,
                                        $description)
    {
        $sql = "INSERT INTO companyVideo (videoPath, title, description,
                    company_id)
                VALUES ('$videoPath', '$title', '$description', $companyId)";

        return self::write($sql);
    }

    public static function getRecentVideos($count, $offset)
    {
        $sql = "SELECT company.company_id, company.name, company.logo,
                    companyVideo.companyVideo_id, companyVideo.title,
                    companyVideo.createTime
                FROM company
                INNER JOIN companyVideos
                ON company.company_id = companyVideo.company_id
                ORDER BY companyVideo.createTime
                LIMIT $count
                OFFSET $offset";

        return DB::returnResult(DB::select($sql));
    }
}

?>
