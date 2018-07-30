let postParams = {
    "groupId"    : Router.getParameters()[2],
    "count"             : 10,
    "offset"            : 0
};

$.ajax({
    url: 'php/getGroupPosts.php',
    beforeSend: function(request){
        request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
    },
    type: 'POST',
    data: postParams,
    success: function(data) {
        let conversation = JSON.parse(data);
        printConversation(conversation);
    },
    error: function(xhr, textStatus, errorThrown) {
        if (xhr.status == 401) {
            console.log("not logged in");
            location.hash = "/innlogging";
        } else {
            console.log("error: " + xhr.status);
        }
    }
});

let chatInput = document.getElementById('chatInput');
let chat = $("#conversation");

$("#sendBtn").click(sendMessage);

$('#chatInput').on('keypress', function(e) {
    let keyCode = e.keyCode || e.which;
    if (keyCode === 13) {
        sendMessage();
    }
});

let chatbox = document.getElementById("conversation");
const msgTemplate = document.getElementById("conversation").innerHTML;

function sendMessage() {
    let msg = chatInput.value;
    msg = msg.trim();

    if (msg == "") {
        return false;
    }

    let data = {
        conversationId  : postParams["conversationId"],
        content         : msg
    };

    $.ajax({
        url: 'php/sendMessage.php',
        beforeSend: function(request){
            request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
        },
        type: 'POST',
        data: data,
        success: function(id) {
            printMessage(msg, id);
            chatInput.value = "";
        },
        error: function() {
            console.log("not logged in");
            location.hash = "/innlogging";
        }
    });
}

function getNewMessages() {
    $(document).ready(function () {
        let prevId = $("#conversation").children().last().attr("id");
        console.log(prevId);
        let params = {
            "prevId"            : prevId,
            "conversationId"    : postParams["conversationId"]
        };

        $.ajax({
            url: 'php/getNewConversationMessages.php',
            beforeSend: function(request){
                request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
            },
            type: 'POST',
            data: params,
            success: function(data) {
                let newMsgs = JSON.parse(data);
                if (newMsgs.length > 0) {
                    printNewMessages(newMsgs);
                }
            },
            error: function(xhr, textStatus, errorThrown) {
                if (xhr.status == 401) {
                    console.log("not logged in");
                    location.hash = "/innlogging";
                } else {
                    console.log("error: " + xhr.status);
                }
            }
        });
    });
}

function printMessage(msg, id) {
    let newMsg = msgTemplate.replace("{{content}}", msg);
    newMsg = newMsg.replace("{{styleClass}}", "sentMessage");
    newMsg = newMsg.replace("{{id}}", id);
    chatbox.innerHTML += newMsg;
    chatbox.scrollTop = chatbox.scrollHeight;
}

function printConversation(conv) {
    $("#currentPageHeader").text(conv["name"]);
    let messages = conv["messages"];
    let rendered = Pattern.render(msgTemplate, messages);
    chatbox.innerHTML = rendered;
    chatbox.classList.remove("w3-hide");
    chatbox.scrollTop = chatbox.scrollHeight;
}

function printNewMessages(msg) {
    let rendered = Pattern.render(msgTemplate, msg);
    chatbox.innerHTML += rendered;
    chatbox.scrollTop = chatbox.scrollHeight;
}

let messagesRetrieval = setInterval("getNewMessages()", 1000);
