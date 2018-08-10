function messages() {
    var inbox = inbox || document.getElementById("inbox");
    var inboxTemplate = inboxTemplate || document.getElementById("template");

    $("#currentPageHeader").text("Samtaler");

    $.ajax({
        url: 'php/getMessages.php',
        beforeSend: function(request){
            request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
        },
        type: 'POST',
        success: function(data) {
            let messageList = JSON.parse(data);
            console.log(data);
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
    var inbox = document.getElementById("inbox");
    var inboxTemplate = document.getElementById("template");
    document.title = "Innboks | InMarket App";
    if (messageList.length == 0) {
        inbox.innerHTML = "No messages";
    } else {
        console.log(messageList);
        let template = inboxTemplate.innerHTML;
        console.log("template: " + template);
        let rendered = Pattern.render(template, messageList);
        inboxTemplate.innerHTML = rendered;
    }
    inbox.classList.remove("w3-hide");
}
