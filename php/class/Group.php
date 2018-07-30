<?php
require_once 'DB.php';

/**
 * Class for doing stuff with groups
 */
class Group
{
    public static function getGroupMembers($groupId)
    {
        $sql = "SELECT user.id, user.name, user.profilePicture, groupMember.isGroupAdmin
                FROM user
                INNER JOIN groupMember on user.id=groupMember.user_id";

        $result = DB::returnResult(DB::select($sql));

        echo json_encode($result);
    }

    public static function getGroupDetails($groupId)
    {
        $sql = "SELECT name, description
                FROM group
                WHERE id=$groupId";

        echo DB::returnResult(DB::select($sql));
    }

    public static function createGroup($groupName, $groupDescription)
    {
        $sql = "INSERT INTO group (name, description)
                VALUES ('$groupName', '$groupDescription')";

        return DB::write($sql);
    }

    public static function addGroupMember($groupId, $userId, $isAdmin)
    {
        $sql = "INSERT INTO groupMember (user_id, group_id, isGroupAdmin)
                VALUES ($userId,$groupId, $isAdmin)";

        return DB::write($sql);
    }

    public static function createGroupPost($groupId, $userId, $content)
    {
        $date = new DateTime();
        $timestamp = $date->getTimestamp();

        $sql = "INSERT INTO post (poster, group_id, content, timestamp)
                VALUES ($userId, $groupId, '$content', $timestamp)";

        return DB::write($sql);
    }

    public static function postComment($postId, $userId, $content)
    {
        $date = new DateTime();
        $timestamp = $date->getTimestamp();

        $sql = "INSERT INTO postComment (post_id, user_id, timestamp, content)
                VALUES ($postId, $userId, $timestamp, '$content')";

        return DB::write($sql);
    }

    public static function getGroupPosts($groupId)
    {
        $sql = "SELECT id, poster, content, timestamp
                FROM post
                WHERE group_id=$groupId";

        $result = DB::returnResult(DB::select($sql));

        $posts = array()

        foreach ($result as $OP) {
            $postId = $OP["id"];
            $sql = "SELECT id, user_id, timestamp, content
                    FROM postComment
                    WHERE post_id=$postId";

            $comments = DB::select($sql);

            $posts[] = array('OP' => $OP, 'comments' => $comments);
        }

        echo json_encode($posts);

    }


}

?>
