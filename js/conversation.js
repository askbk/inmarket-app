$(document).ready(function () {
    console.log(Router.getParameters());
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
});

function printConversation(conv) {
    $("#currentPageHeader").text();
    console.log(conv);
    let template = document.getElementById("conversation").innerHTML;
    console.log("template: " + template);
    let rendered = Pattern.render(template, conv);
    document.getElementById("conversation").innerHTML = rendered;
}
