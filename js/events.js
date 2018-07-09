/*$.get("php/getEvents.php", function (data, status) {
    $("#currentPageHeader").text("Eventer nær deg");
    let events = JSON.parse(data);

    if (events.length == 0) {
        document.getElementById("eventTable").classList.add("w3-hide");
    } else {
        console.log(events);
        let template = document.getElementById("template").innerHTML;
        console.log("template: " + template);
        let rendered = Pattern.render(template, events);
        document.getElementById("template").innerHTML = rendered;
    }
});*/
console.log(localStorage.jwt);
$.ajax({
    url: 'php/getEvents.php',
    beforeSend: function(request){
        request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
    },
    type: 'GET',
    success: function(data) {
        $("#currentPageHeader").text("Eventer nær deg");
        let events = JSON.parse(data);

        if (events.length == 0) {
            document.getElementById("eventTable").classList.add("w3-hide");
        } else {
            console.log(events);
            let template = document.getElementById("template").innerHTML;
            console.log("template: " + template);
            let rendered = Pattern.render(template, events);
            document.getElementById("template").innerHTML = rendered;
        }
    },
    error: function() {
        alert('error not logged in');
    }
});
