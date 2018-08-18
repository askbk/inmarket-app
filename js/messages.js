let inbox, inboxTemplate;

function messages() {
    inbox = inbox || document.getElementById("inbox");
    inboxTemplate = inboxTemplate || document.getElementById("template");

    $("#currentPageHeader").text("Samtaler");

    $.ajax({
        url: 'php/getMessages.php',
        beforeSend: function(request){
            request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
        },
        type: 'POST',
        success: function(data) {
            let messageList = JSON.parse(data);
            printMessageList(messageList);
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
}

function printMessageList(messageList) {
    document.title = "Innboks | InMarket App";
    if (messageList.length == 0) {
        inbox.innerHTML = "No messages";
    } else {
        let template = inboxTemplate.innerHTML;
        let rendered = Pattern.render(template, messageList);
        inboxTemplate.innerHTML = rendered;
    }
    inbox.classList.remove("w3-hide");
}
