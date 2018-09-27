let chatInput, chat, chatbox, msgTemplate, postParams;

function conversation() {
    chatInput = document.getElementById('chatInput');
    chat = $("#conversation");
    chatbox = document.getElementById("conversation");
    msgTemplate = msgTemplate || document.getElementById("messageTemplate").innerHTML;
    curConvId = Router.getParameters()[2];

    const sendMessage = function () {
        let msg = ConversationController.getMessageDraft();
        if (msg != "") {
            ConversationModel.sendMessage(msg, curConvId)
            .then(
                result => {
                    return Promise.resolve(
                        ConversationModel.getNewMessages(
                            ConversationController.getPrevId(),
                            curConvId
                        )
                    );
                }
            )
            .then(
                result => {
                    ConversationController.printNewMessages(result);
                    ConversationController.clearInput();
                    ConversationController.scrollBottom();

                }
            );
        }
    }

    $("#sendBtn").click(sendMessage);

    $('#chatInput').on('keypress', function(e) {
        let keyCode = e.keyCode || e.which;
        if (keyCode === 13) {
            sendMessage();
        }
    });

    postParams = {
        "conversationId"    : curConvId,
        "count"             : 10,
        "offset"            : 0
    };

    ConversationModel.getConversation(postParams)
        .then(
            result => {
                ConversationController.printConversation(result);
                ConversationController.scrollBottom();
            }
        );

    let messagesRetrieval = setInterval(
        function () {
            ConversationModel.getNewMessages(
                ConversationController.getPrevId() || 0,
                curConvId
            )
                .then(
                    result => {
                        if (result.length > 0) {
                            ConversationController.printNewMessages(result);
                        }
                    }
                );
        },
        1000
    );

    window.addEventListener("hashchange", function () {
        clearInterval(messagesRetrieval);
    })

}

let ConversationModel = {
    getConversation : function (postParams) {
        return new Promise(function(resolve, reject) {
            $.ajax({
                url: 'php/getConversation.php',
                beforeSend: function(request){
                    request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
                },
                type: 'POST',
                data: postParams,
                success: function(data) {
                    let conv = JSON.parse(data);
                    resolve(conv)
                },
                error: function(xhr, textStatus, errorThrown) {
                    if (xhr.status == 401) {
                        console.log("not logged in");
                        location.hash = "/innlogging";
                    } else {
                        console.log("error: " + xhr.status);
                    }
                    reject("error");
                }
            });
        });
    },
    sendMessage     : function (msg, convId) {
        return new Promise(function(resolve, reject) {
            let data = {
                conversationId  : convId,
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
                    resolve(id);
                },
                error: function() {
                    console.log("not logged in");
                    location.hash = "/innlogging";
                    reject("error");
                }
            });
        });
    },
    getNewMessages  : function (prevId, convId) {
        return new Promise((resolve, reject) => {
            let params = {
                "prevId"            : prevId,
                "conversationId"    : convId
            };

            $.ajax({
                url: 'php/getConversation.php',
                beforeSend: function(request){
                    request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
                },
                type: 'POST',
                data: params,
                success: function(data) {
                    let newMsgs = JSON.parse(data);
                    resolve(newMsgs);
                },
                error: function(xhr, textStatus, errorThrown) {
                    if (xhr.status == 401) {
                        console.log("not logged in");
                        location.hash = "/innlogging";
                    } else {
                        console.log("error: " + xhr.status);
                    }
                    reject("error");
                }
            });
        })
    }
}

let ConversationController = {
    printConversation   : function (conv) {
        $("#currentPageHeader").text(conv["name"]);
        let messages = conv["messages"];
        let rendered = Pattern.render(msgTemplate, messages);
        chatbox.innerHTML = rendered;
        chatbox.classList.remove("w3-hide");
    },
    printMessage        : function (msg, id) {
        let newMsg = msgTemplate.replace("{{content}}", msg);
        newMsg = newMsg.replace("{{styleClass}}", "sentMessage");
        newMsg = newMsg.replace("{{message_id}}", id);
        chatbox.innerHTML += newMsg;
    },
    printNewMessages    : function (msg) {
        let rendered = Pattern.render(msgTemplate, msg);
        let isScrolled = false;
        if (window.scrollY == window.scrollMaxY) {
            isScrolled = true;
        }
        chatbox.innerHTML += rendered;
        if (isScrolled) {
            ConversationController.scrollBottom();
        }
    },
    getPrevId           : function () {
        let prevId;
        try {
            prevId = $("#conversation").children().last().attr("id");
            if (prevId.indexOf("{") > -1) {
                return undefined;
            }
            return prevId;
        } catch (e) {
            return undefined
        }
    },
    getMessageDraft     : function () {
        return (chatInput.value).trim()
    },
    clearInput          : function () {
        chatInput.value = "";
    },
    scrollBottom        : function () {
        window.scrollTo(0, $(document).height());
    }
}
