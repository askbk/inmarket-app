<?php
require_once 'DB.php';

/**
 * Class for managing groups
 */
class Group
{
    //  Returns members of the group with the given ID.
    public static function getMembers($groupId)
    {
        $sql = "SELECT user.user_id, user.name, user.profilePicture,
                    groupMember.isGroupAdmin
                FROM user
                INNER JOIN groupMember ON user.user_id = groupMember.user_id
                WHERE groupMember.group_id = $groupId";

        return DB::returnArray(DB::select($sql));
    }

    //  Returns a list of all groups the given user is a member of.
    //  adminGroups:    returns only groups that the user is an admin of if true
    //  details:        returns the list of groups including group details
    public static function getGroupList($user_id, $adminGroups = false,
                                            $details = true)
    {
        $sql = "SELECT group_id
        FROM groupMember
        WHERE user_id = $user_id";

        if ($adminGroups) {
            $sql .= " AND isGroupAdmin = 1";
        }

        $groupIds = DB::returnArray(DB::select($sql));

        if ($details) {
            $groupList = array();

            for ($i=0; $i < count($groupIds); $i++) {
                $groupList[] = self::getDetails($groupIds[$i]["group_id"]);
            }
            return $groupList;
        }

        return $groupIds;
    }

    //  Returns some details about the group.
    public static function getDetails($groupId)
    {
        $sql = "SELECT *
                FROM `group`
                WHERE group_id = $groupId";

        return DB::returnValue(DB::select($sql));
    }

    //  Inserts a new group into the database with the given name and
    //  description.
    public static function insert($groupName, $groupDescription)
    {
        $sql = "INSERT INTO `group` (name, description)
                VALUES ('$groupName', '$groupDescription')";

        return DB::write($sql);
    }

    //  Adds a new member to the specified group.
    public static function addMember($groupId, $userId, $isAdmin = 0)
    {
        $sql = "INSERT INTO groupMember (user_id, group_id, isGroupAdmin)
                VALUES ($userId, $groupId, $isAdmin)";

        return DB::write($sql);
    }

    //  Inserts a new post into the given group.
    public static function insertPost($groupId, $userId, $content)
    {
        $date = new DateTime();
        $timestamp = $date->getTimestamp();

        $sql = "INSERT INTO post (poster, group_id, content, timestamp)
                VALUES ($userId, $groupId, '$content', $timestamp)";

        return DB::write($sql);
    }

    //  Inserts a new comment into the given post.
    public static function insertComment($postId, $userId, $content)
    {
        $date = new DateTime();
        $timestamp = $date->getTimestamp();

        $sql = "INSERT INTO postComment (post_id, user_id, timestamp, content)
                VALUES ($postId, $userId, $timestamp, '$content')";

        return DB::write($sql);
    }

    //  Returns all posts belonging to the given group.
    public static function getPosts($groupId)
    {
        $sql = "SELECT user.name, post.post_id, post.poster, post.content,
                    post.timestamp
                FROM post
                INNER JOIN user
                ON post.poster = user.user_id
                WHERE group_id = $groupId
                ORDER BY post.post_id DESC";

        return DB::returnArray(DB::select($sql));
    }

    //  Returns all posts belonging to the given group that have an ID greater
    //  than the given post.
    public static function getNewPosts($groupId, $prevId)
    {
        $sql = "SELECT user.name, post.post_id, post.poster, post.content,
                    post.timestamp
                FROM post
                INNER JOIN user
                ON post.poster = user.user_id
                WHERE group_id = $groupId
                AND post_id > $prevId";

        return DB::returnArray(DB::select($sql));
    }

    //  Returns all comments of the post that have an ID greater than the given
    //  comment.
    public static function getPostComments($postId, $prevId = 0)
    {
        $sql = "SELECT user.name, postComment.postComment_id,
                    postComment.user_id, postComment.timestamp,
                    postComment.content, postComment.post_id
                FROM postComment
                INNER JOIN user
                ON postComment.user_id = user.user_id
                WHERE postComment.post_id = $postId
                    AND postComment.postComment_id > $prevId
                ORDER BY postComment.postComment_id ASC";

        return DB::returnArray(DB::select($sql));
    }

    //  Checks if the user is admin of the given group.
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
}

?>
