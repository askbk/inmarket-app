<?php
require_once 'class/Message.php';
require_once 'class/Auth.php';

if (Auth::isLoggedIn()) {
    $user_id = Auth::getUserId();
    $convId = $_POST["conversationId"];

    if (isset($_POST["details"]) && isset($_POST["participants"])) {
        $result = array(
            'details' => Message::getDetails($convId, $user_id),
            'participants' => Message::getParticipants($convId)
        );

        echo json_encode($result);
        exit();
    }

    if (isset($_POST["prevId"])) {
        $newMessages = Message::getNewMessages($convId, $_POST["prevId"]);

        for ($i=0; $i < count($newMessages); $i++) {
            if ($newMessages[$i]["sender"] != $user_id) {
                $newMessages[$i]["styleClass"] = "receivedMessage";
            } else {
                $newMessages[$i]["styleClass"] = "sentMessage";
            }
        }

        echo json_encode($newMessages);
    } else {
        $conversationName = Message::getConversationName($convId, $user_id);
        $count = $_POST["count"];
        $offset = $_POST["offset"];
        $messages = Message::getMessages($convId, $count, $offset);

        for ($i=0; $i < count($messages); $i++) {
            if ($messages[$i]["sender"] != $user_id) {
                $messages[$i]["styleClass"] = "receivedMessage";
            } else {
                $messages[$i]["styleClass"] = "sentMessage";
            }
        }

        $conversation = array('messages' => $messages, 'name' => $conversationName);

        echo json_encode($conversation);
    }

}
?>
