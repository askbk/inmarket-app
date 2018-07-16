


$(document).ready(function () {
    console.log(Router.getParameters());
    let chatbox = document.getElementById("conversation");
    let msgTemplate = document.getElementById("conversation").innerHTML;
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
        error: function() {
            console.log("not logged in");
        }
    });

    let chatInput = document.getElementById('chatInput');
    let chat = $("#conversation");

    $("#sendBtn").click(sendMessage());

    $('#conversation').on('keyup keypress', function(e) {
        let keyCode = e.keyCode || e.which;
        if (keyCode === 13) {
            sendMessage();
        }
    });

    function printConversation(conv) {
        $("#currentPageHeader").text();
        console.log(conv);
        //let template = document.getElementById("conversation").innerHTML;
        //console.log("template: " + template);
        let rendered = Pattern.render(msgTemplate, conv);
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
                let newMsg = msgTemplate.replace("{{content}}", msg);
                newMsg = newMsg.replace("{{styleClass}}", "sentMessage");
                chat.append(newMsg);
                chatInput.value = "";
            },
            error: function() {
                console.log("not logged in");
            }
        });
    }

});
