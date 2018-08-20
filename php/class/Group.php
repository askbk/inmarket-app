<?php
require_once 'DB.php';

/**
 * Class for doing stuff with groups
 */
class Group
{
    public static function getMembers($groupId)
    {
        $sql = "SELECT user.user_id, user.name, user.profilePicture,
                    groupMember.isGroupAdmin
                FROM user
                INNER JOIN groupMember ON user.user_id = groupMember.user_id
                WHERE groupMember.group_id = $groupId";

        return DB::returnResult(DB::select($sql));
    }

    public static function getGroupList($user_id)
    {
        $sql = "SELECT group_id
                FROM groupMember
                WHERE user_id = $user_id";

        $groupIds = DB::returnResult(DB::select($sql));

        $groupList = array();

        for ($i=0; $i < count($groupIds); $i++) {
            $groupList[] = self::getDetails($groupIds[$i]["group_id"]);
        }

        return $groupList;
    }

    public static function getDetails($groupId)
    {
        $sql = "SELECT *
                FROM `group`
                WHERE group_id = $groupId";

        return DB::returnValue(DB::select($sql));
    }

    public static function insert($groupName, $groupDescription)
    {
        $sql = "INSERT INTO `group` (name, description)
                VALUES ('$groupName', '$groupDescription')";

        return DB::write($sql);
    }

    public static function addMember($groupId, $userId, $isAdmin)
    {
        $sql = "INSERT INTO groupMember (user_id, group_id, isGroupAdmin)
                VALUES ($userId, $groupId, $isAdmin)";

        return DB::write($sql);
    }

    public static function insertPost($groupId, $userId, $content)
    {
        $date = new DateTime();
        $timestamp = $date->getTimestamp();

        $sql = "INSERT INTO post (poster, group_id, content, timestamp)
                VALUES ($userId, $groupId, '$content', $timestamp)";

        return DB::write($sql);
    }

    public static function insertComment($postId, $userId, $content)
    {
        $date = new DateTime();
        $timestamp = $date->getTimestamp();

        $sql = "INSERT INTO postComment (post_id, user_id, timestamp, content)
                VALUES ($postId, $userId, $timestamp, '$content')";

        return DB::write($sql);
    }

    public static function getPosts($groupId)
    {
        $sql = "SELECT user.name, post.post_id, post.poster, post.content,
                    post.timestamp
                FROM post
                INNER JOIN user
                ON post.poster = user.user_id
                WHERE group_id = $groupId
                ORDER BY post.post_id DESC";

        return DB::returnResult(DB::select($sql));
    }

    public static function getNewPosts($groupId, $prevId)
    {
        $sql = "SELECT user.name, post.post_id, post.poster, post.content,
                    post.timestamp
                FROM post
                INNER JOIN user
                ON post.poster = user.user_id
                WHERE group_id = $groupId
                AND post_id > $prevId
                ORDER BY timestamp ASC";

        return DB::returnResult(DB::select($sql));
    }

    public static function getNewComments($groupId, $prevId)
    {
        // code...
    }

    public static function getPostComments($postId)
    {
        $sql = "SELECT user.name, postComment.postComment_id,
                    postComment.user_id, postComment.timestamp,
                    postComment.content
                FROM postComment
                INNER JOIN user
                ON postComment.user_id = user.user_id
                WHERE postComment.post_id = $postId
                ORDER BY postComment.postComment_id ASC";

        return DB::returnResult(DB::select($sql));
    }

    public static function isAdmin($user_id, $groupId)
    {
        $sql = "SELECT isGroupAdmin
                FROM groupMember
                WHERE user_id = $user_id AND group_id = $groupId
                LIMIT 1";

        $result = DB::select($sql);

        if($result->num_rows > 0) {
            return true;
        }

        return false;
    }

    public static function getAdminGroups($user_id)
    {
        $sql = "SELECT group_id
                FROM groupMember
                WHERE user_id = $user_id AND isGroupAdmin = 1";

        return DB::returnResult(DB::select($sql));
    }
}

?>
