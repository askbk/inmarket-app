<?php
require_once 'DB.php';

/**
 * Class for message handling
 */
class Message
{
    //  Returns a list of all conversations the user is a member of, ordered by
    //  how recently a message was sent (by any member).
    public static function getConversationList($user_id, $includeDetails = 1, $count = -1, $offset = 0)
    {
        $sql = "SELECT conversation_id
                FROM conversationParticipants
                WHERE user_id = $user_id";
        if ($count > 0) {
              $sql .= " LIMIT $count
              OFFSET $offset";
        }

        $conversationIds = DB::returnArray(DB::select($sql));

        if ($includeDetails == 0) {
            return $conversationIds;
        }

        $latestMessages = array();

        for ($i=0; $i < count($conversationIds); $i++) {
            $latestMessages[] = self::getLatest($conversationIds[$i]["conversation_id"]);
        }
        // var_dump($latestMessages);
        usort($latestMessages, "sortByTime");

        return $latestMessages;
    }

    //  Returns a list of all messages in a conversation.
    public static function getMessages($conversationId, $count,
                                                    $offset)
    {
        $sql = "SELECT *
                FROM message
                WHERE conversation_id = $conversationId
                ORDER BY message_id ASC";

        return DB::returnArray(DB::select($sql));
    }

    //  Returns a list of messages in the group that are more recent than the
    //  given.
    public static function getNewMessages($conversationId, $prevId)
    {
        $sql = "SELECT *
                FROM message
                WHERE conversation_id = $conversationId
                AND message_id > $prevId
                ORDER BY timestamp ASC";

        return DB::returnArray(DB::select($sql));
    }

    //  Returns the most recent message in a conversation.
    private static function getLatest($conversationId)
    {
        $sql = "SELECT *
                FROM message
                WHERE conversation_id = $conversationId
                ORDER BY timestamp DESC
                LIMIT 1";
        //echo "<br>query: $sql<br>";
        $result = DB::returnValue(DB::select($sql));
        if (sizeof($result) == 0) {
            return array('message_id'       => "",
                        "conversation_id"   => $conversationId,
                        "sender"            => "",
                        "content"           => "",
                        "timestamp"         => "");
        }
    }

    //  Sends a message to the given conversation.
    public static function send($conversationId, $sender_id, $content)
    {
        $date = new DateTime();
        $timestamp = $date->getTimestamp();

        $sql = "INSERT INTO message (conversation_id, sender, content,
                    timestamp)
                VALUES ($conversationId, $sender_id, '$content', '$timestamp')";

        return DB::write($sql);
    }

    //  Starts a conversation between two people. Can add more participants.
    public static function startConversation($user_id1, $user_id2,
                                                $isGroupConvo = 0)
    {
        $sql = "INSERT INTO conversation (isGroupConversation)
                VALUES ($isGroupConvo)";

        $conversationId = DB::write($sql);

        self::addParticipant($conversationId, $user_id1);
        self::addParticipant($conversationId, $user_id2);

        return $conversationId;
    }

    //  Create a conversation. Used in the control panel.
    public static function createConversation($user_id, $name = "", $isGroupConvo = 0, $group_id = NULL)
    {
        $sql = "INSERT INTO conversation (name, isGroupConversation, group_id)
                VALUES ('$name', $isGroupConvo, $group_id)";

        $conversationId = DB::write($sql);

        self::addParticipant($conversationId, $user_id);

        return $conversationId;
    }

    //  Checks if there already exists a private conversation between to users
    public static function conversationExists($user_id1, $user_id2)
    {
        $conversationIds = self::getConversationList($user_id1);

        var_dump($conversationIds);

        foreach ($conversationIds as $conversationId) {
            if (!self::isGroupConversation($conversationId["conversationId"]) && self::isParticipant($user_id2)) {
                return $conversationId["conversationId"];
            }
        }

        return -1;
    }

    public static function addParticipant($conversationId, $user_id)
    {
        // TODO: Check whether the conversation is marked as a group convo.

        $sql = "INSERT INTO conversationParticipants (user_id, conversation_id)
                VALUES ($user_id, $conversationId)";

        DB::write($sql);
    }

    //  Checks if a user is a participant in a conversation.
    public static function isParticipant($user_id, $conversationId)
    {
        $sql = "SELECT *
                FROM conversationParticipants
                WHERE user_id = $user_id AND conversation_id = $conversationId
                LIMIT 1";

        $result = DB::select($sql);

        if($result->num_rows > 0) {
            return true;
        }

        return false;
    }

    //  Sets the conversation's corresponding group ID
    public static function setGroup($conversation_id, $group_id)
    {
        $sql = "UPDATE conversation
                SET group_id = $group_id
                WHERE conversation_id = $conversation_id";

        return DB::write($sql);
    }

    //  Returns the ID of the group corresponding to the given ID
    public static function getGroup($conversation_id)
    {
        $sql = "SELECT group_id
                FROM conversation
                WHERE conversation_id = $conversation_id";

        return DB::returnValue(DB::select($sql));
    }

    //  Checks if a conversation is a group conversation.
    public static function isGroupConversation($conversationId)
    {
        $sql = "SELECT isGroupConversation
                FROM conversation
                WHERE conversation_id = $conversationId";

        $result = DB::returnValue(DB::select($sql));

        if ($result["isGroupConversation"] == 1) {
            return true;
        }

        return false;
    }

    //  Returns the name of the conversation.
    public static function getConversationName($conversationId, $user_id)
    {
        $sql = "SELECT name
                FROM conversation
                WHERE conversation_id = $conversationId AND name IS NOT NULL";
        $result = DB::returnValue(DB::select($sql));

        if ($result) {
            return $result["name"];
        } else {
            $sql = "SELECT user_id
                    FROM conversationParticipants
                    WHERE conversation_id = $conversationId
                        AND user_id != $user_id";

            $participants = DB::returnArray(DB::select($sql));

            $names = array();

            foreach ($participants as $participant) {
                $names[] = User::getUserName($participant["user_id"]);
            }

            return implode(", ", $names);
        }
    }

    //  Updates the name of the conversation.
    public static function setConversationName($conversationId, $name)
    {
        $sql = "INSERT INTO conversation (name)
                VALUES ('$name')
                WHERE conversation_id = $conversationId";

        return DB::write($sql);
    }

    //  Returns all participants of a conversation.
    public static function getParticipants($convId)
    {
        $sql = "SELECT user.user_id, user.name, user.profilePicture
                FROM user
                INNER JOIN conversationParticipants ON user.user_id = conversationParticipants.user_id
                WHERE conversationParticipants.conversation_id = $convId";

        return DB::returnArray(DB::select($sql));
    }

    //  Removes a user from the conversation
    public static function removeParticipant($conversation_id, $user_id)
    {
        $sql = "DELETE FROM conversationParticipants
                WHERE conversation_id = $conversation_id
                AND user_id = $user_id";

        return DB::write($sql);
    }

    //  Returns details of a conversation
    public static function getDetails($convId, $user_id)
    {
        return array(
            'name' => self::getConversationName($convId, $user_id)
        );
    }

    //  Search all users who are not participants of a given conversation.
    public static function exclusiveSearch($query, $conversationId)
    {
        $sql = "SELECT user_id, name, profilePicture, email
                FROM user AS u
                WHERE
                    NOT EXISTS (
                        SELECT user_id
                        FROM conversationParticipants AS p
                        WHERE u.user_id = p.user_id
                        AND p.conversation_id = $conversationId
                    )
                    AND (
                        name LIKE '%$query%'
                        OR email LIKE '%$query%'
                    )";

        return DB::returnArray(DB::select($sql));
    }
}

function sortByTime($a, $b)
{
    $ad = new DateTime($a['timestamp']);
    $bd = new DateTime($b['timestamp']);

    if ($ad == $bd) {
        return 0;
    }

    return $ad < $bd ? -1 : 1;
}
?>
