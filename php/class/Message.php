<?php
require_once 'DB.php';

/**
 * Class for message handling
 */
class Message
{
    public static function getConversationList($user_id, $count, $offset)
    {
        $sql = "SELECT conversation_id
                FROM conversationParticipants
                WHERE user_id = $user_id
                LIMIT $count
                OFFSET $offset";
        //echo "query: $sql <br>";
        $conversationIds = DB::returnResult(DB::select($sql));
        //echo "conversation ids:";
        // var_dump($conversationIds);

        $latestMessages = array();

        for ($i=0; $i < count($conversationIds); $i++) {
            $latestMessages[] = self::getLatestMessage($conversationIds[$i]["conversation_id"]);
        }
        // var_dump($latestMessages);
        usort($latestMessages, "sortByTime");

        return $latestMessages;
    }

    public static function getConversationMessages($conversationId, $count, $offset)
    {
        $sql = "SELECT *
                FROM message
                WHERE conversation_id = $conversationId
                ORDER BY message_id ASC";

        $result = DB::returnResult(DB::select($sql));
        //usort($result, "sortByTime");

        return $result;
    }

    public static function getNewConversationMessages($conversationId, $prevId)
    {
        $sql = "SELECT *
                FROM message
                WHERE conversation_id = $conversationId
                AND message_id > $prevId
                ORDER BY timestamp ASC";

        return DB::returnResult(DB::select($sql));
    }

    private static function getLatestMessage($conversationId)
    {
        $sql = "SELECT *
                FROM message
                WHERE conversation_id = $conversationId
                ORDER BY timestamp DESC
                LIMIT 1";
        //echo "<br>query: $sql<br>";
        return DB::returnValue(DB::select($sql));
    }

    public static function sendMessage($conversationId, $sender_id, $content)
    {
        $date = new DateTime();
        $timestamp = $date->getTimestamp();

        $sql = "INSERT INTO message (conversation_id, sender, content,
                    timestamp)
                VALUES ($conversationId, $sender_id, '$content', '$timestamp')";

        return DB::write($sql);
    }

    public static function startConversation($user_id1, $user_id2,
                                                $isGroupConvo)
    {
        $sql = "INSERT INTO conversation (isGroupConversation)
                VALUES ($isGroupConvo)";

        $conversationId = DB::write($sql);

        self::addParticipant($conversationId, $user_id1);
        self::addParticipant($conversationId, $user_id2);

        return $conversationId;
    }

    public static function addParticipant($conversationId, $user_id)
    {
        /*$sql = "SELECT groupConversation
                FROM conversation
                WHERE id=$conversationId";

        if (DB::returnResult(DB::select($sql))[0] == 0) {
            echo "cannot add participants to private conversations";
            exit();
        }*/

        $sql = "INSERT INTO conversationParticipants (user_id, conversation_id)
                VALUES ($user_id, $conversationId)";

        DB::write($sql);
    }

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

            $participants = DB::returnResult(DB::select($sql));

            $names = array();

            foreach ($participants as $participant) {
                $names[] = User::getUserName($participant["user_id"]);
            }

            return implode(", ", $names);
        }
    }

    public static function setConversationName($conversationId, $name)
    {
        $sql = "INSERT INTO conversation (name)
                VALUES ('$name')
                WHERE conversation_id = $conversationId";

        return DB::write($sql);
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
