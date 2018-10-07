let chatInput, chat, chatbox, msgTemplate, postParams;

function conversation() {
    chatInput = document.getElementById('chatInput');
    chat = $("#conversation");
    chatbox = document.getElementById("conversation");
    msgTemplate = msgTemplate || document.getElementById("messageTemplate").innerHTML;
    curConvId = Router.getParameters()[2];

    const sendMessage = () => {
        const msg = ConversationController.getMessageDraft();
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

    $('#chatInput').on('keypress', e => {
        const keyCode = e.keyCode || e.which;
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
        () => {
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

    window.addEventListener("hashchange", () => {
        clearInterval(messagesRetrieval);
    })

}

const ConversationModel = {
    getConversation : postParams => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'php/getConversation.php',
                beforeSend: request => {
                    request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
                },
                type: 'POST',
                data: postParams,
                success: data => {
                    resolve(JSON.parse(data));
                },
                error: (xhr, textStatus, errorThrown) => {
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
    sendMessage     : (msg, convId) => {
        return new Promise((resolve, reject) => {
            const data = {
                conversationId  : convId,
                content         : msg
            };

            $.ajax({
                url: 'php/sendMessage.php',
                beforeSend: request => {
                    request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
                },
                type: 'POST',
                data: data,
                success: id => {
                    resolve(id);
                },
                error: () => {
                    console.log("not logged in");
                    location.hash = "/innlogging";
                    reject("error");
                }
            });
        });
    },
    getNewMessages  : (prevId, convId) => {
        return new Promise((resolve, reject) => {
            const params = {
                "prevId"            : prevId,
                "conversationId"    : convId
            };

            $.ajax({
                url: 'php/getConversation.php',
                beforeSend: request => {
                    request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
                },
                type: 'POST',
                data: params,
                success: data => {
                    resolve(JSON.parse(data));
                },
                error: (xhr, textStatus, errorThrown) => {
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

const ConversationController = {
    printConversation   : conv => {
        $("#currentPageHeader").text(conv["name"]);
        const messages = conv["messages"];
        const rendered = Pattern.render(msgTemplate, messages);
        chatbox.innerHTML = rendered;
        chatbox.classList.remove("w3-hide");
    },
    printMessage        : (msg, id) => {
        let newMsg = msgTemplate.replace("{{content}}", msg);
        newMsg = newMsg.replace("{{styleClass}}", "sentMessage");
        newMsg = newMsg.replace("{{message_id}}", id);
        chatbox.innerHTML += newMsg;
    },
    printNewMessages    : msg => {
        const rendered = Pattern.render(msgTemplate, msg);
        let isScrolled = false;
        if (window.scrollY == window.scrollMaxY) {
            isScrolled = true;
        }
        chatbox.innerHTML += rendered;
        if (isScrolled) {
            ConversationController.scrollBottom();
        }
    },
    getPrevId           : () => {
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
    getMessageDraft     : () => {
        return (chatInput.value).trim()
    },
    clearInput          : () => {
        chatInput.value = "";
    },
    scrollBottom        : () => {
        window.scrollTo(0, $(document).height());
    }
}
