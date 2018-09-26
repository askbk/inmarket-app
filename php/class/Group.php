<?php
require_once 'DB.php';

/**
 * Class for managing groups
 */
class Group
{
    //  Creates a new group with the given name and description
    public static function create($name, $description = "")
    {
        $sql = "INSERT INTO `group` (name, description)
                VALUES ('$name', '$description')";

        return DB::write($sql);
    }

    //  Sets the group's conversation to the given group ID
    public static function setConversation($group_id, $conversation_id)
    {
        $sql = "UPDATE `group`
                SET conversation_id = $conversation_id
                WHERE group_id = $group_id";

        return DB::write($sql);
    }

    //  Returns the ID of the group's conversation
    public static function getConversation($group_id)
    {
        $sql = "SELECT conversation_id
                FROM conversation
                WHERE group_id = $group_id";

        return DB::returnValue(DB::select($sql));
    }

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
    public static function getList($user_id, $adminGroups = false,
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

    //  Adds a new member to the specified group.
    public static function addMember($groupId, $userId, $isAdmin = 0)
    {
        $sql = "INSERT INTO groupMember (user_id, group_id, isGroupAdmin)
                VALUES ($userId, $groupId, $isAdmin)";

        return DB::write($sql);
    }

    //  Removes a group member from the given group.
    public static function removeMember($userId, $groupId)
    {
        $sql = "DELETE FROM groupMember
                WHERE user_id = $userId
                    AND group_id = $groupId";

        return DB::write($sql);
    }

    // Sets the admin status of a user in a given group.
    public static function changeAdminStatus($user_id, $groupId, $status)
    {
        $sql = "UPDATE groupMember
                SET isGroupAdmin = $status
                WHERE user_id = $user_id
                    AND group_id = $groupId";

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

    //  Checks if a user is member of the given group
    public static function isMember($user_id, $groupId)
    {
        $sql = "SELECT user_id
                FROM groupMember
                WHERE user_id = $user_id
                    AND group_id = $groupId
                LIMIT 1";

        $result = DB::select($sql);

        if($result->num_rows > 0) {
            return true;
        }

        return false;
    }

    //  Searches for users not in the given group
    public static function exclusiveSearch($string, $groupId)
    {
        $sql = "SELECT user_id, name, profilePicture, email
                FROM user AS u
                WHERE
                    NOT EXISTS (
                        SELECT user_id
                        FROM groupMember AS m
                        WHERE u.user_id = m.user_id
                        AND m.group_id = $groupId
                    )
                    AND (
                        name LIKE '%$string%'
                        OR email LIKE '%$string%'
                    )";

        return DB::returnArray(DB::select($sql));
    }
}

?>
