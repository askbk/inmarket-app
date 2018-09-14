let inbox, inboxTemplate;

function messages() {
    inbox = document.getElementById("inbox");
    inboxTemplate = inboxTemplate || document.getElementById("inboxTemplate").innerHTML;

    $("#currentPageHeader").text("Samtaler");

    MessagesModel.getMessageList(localStorage.id)
        .then(
            (result) => {
                MessagesController.printMessageList(result, document.getElementById("conversationList"));
            }
        );
}

let MessagesModel = {
    getMessageList  : function (userId, includeDetails = 1) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'php/getMessages.php',
                beforeSend: function(request){
                    request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
                },
                type: 'POST',
                data: "includeDetails=" + includeDetails,
                success: function(data) {
                    let messageList = JSON.parse(data);
                    resolve(messageList);
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
    }
}

let MessagesController = {
    printMessageList    : function (messageList, target, template = inboxTemplate) {
        if (messageList.length == 0) {
            target.innerHTML = "No messages";
        } else {
            let rendered = Pattern.render(template, messageList);
            target.innerHTML = rendered;
        }
    }
}
