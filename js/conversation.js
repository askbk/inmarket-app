$(document).ready(function () {
    document.getElementById("bottomNav").classList.add("w3-hide");
    console.log(Router.getParameters());
    let chatbox = document.getElementById("conversation");
    const msgTemplate = document.getElementById("conversation").innerHTML;
    let postParams = {
        "conversationId"    : Router.getParameters()[2],
        "count"             : 10,
        "offset"            : 0
    };

    $.ajax({
        url: 'php/getConversation.php',
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

    $('#chatInput').on('keyup keypress', function(e) {
        let keyCode = e.keyCode || e.which;
        if (keyCode === 13) {
            sendMessage();
        }
    });

    function printConversation(conv) {
        $("#currentPageHeader").text(conv["name"]);
        let messages = conv["messages"];
        let rendered = Pattern.render(msgTemplate, messages);
        document.getElementById("conversation").innerHTML = rendered;
    }

    function sendMessage() {
        let msg = chatInput.value;

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
            success: function(data) {
                printMessage(msg);
                chatInput.value = "";
            },
            error: function() {
                console.log("not logged in");
            }
        });
    }

    function printMessage(msg) {
        let newMsg = msgTemplate.replace("{{content}}", msg);
        newMsg = newMsg.replace("{{styleClass}}", "sentMessage");
        chat.append(newMsg);
    }
});
