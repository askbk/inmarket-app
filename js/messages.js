let inbox, inboxTemplate;

function messages() {
    inbox = document.getElementById("inbox");
    inboxTemplate = inboxTemplate || document.getElementById("inboxTemplate").innerHTML;

    $("#currentPageHeader").text("Samtaler");

    MessagesModel.getMessageList(localStorage.id)
        .then(
            result => {
                MessagesController.printMessageList(result, document.getElementById("conversationList"));
            }
        );
}

const MessagesModel = {
    getMessageList  : (userId, includeDetails = 1) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'php/getMessages.php',
                beforeSend: request => {
                    request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
                },
                type: 'POST',
                data: "includeDetails=" + includeDetails,
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
    }
}

const MessagesController = {
    printMessageList    : (messageList, target, template = inboxTemplate) => {
        if (messageList.length == 0) {
            target.innerHTML = "No messages";
        } else {
            target.innerHTML = Pattern.render(template, messageList);
        }
    }
}
