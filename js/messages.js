$(document).ready(function () {
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
        error: function() {
            console.log("not logged in");
        }
    });
});

function printMessageList(messageList) {
    if (messageList.length == 0) {
        document.getElementById("inbox").innerHTML = "No messages";
    } else {
        console.log(messageList);
        let template = document.getElementById("template").innerHTML;
        console.log("template: " + template);
        let rendered = Pattern.render(template, messageList);
        document.getElementById("template").innerHTML = rendered;
    }
}
