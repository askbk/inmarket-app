$(document).ready(function () {
    let eventTable = document.getElementById("eventTable");
    let eventInfo = document.getElementById("eventInfo");

    let parameter = -1;
    console.log(Router.getParameters());
    if (Router.getParameters().length == 3) {
        parameter = Router.getParameters()[2];
        eventTable.classList.add("w3-hide");
        eventInfo.classList.remove("w3-hide");
    }

    $.ajax({
        url: 'php/getEvents.php?event=' + parameter,
        beforeSend: function(request){
            request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
        },
        type: 'GET',
        success: function(data) {
            let events = JSON.parse(data);

            if (parameter == -1) {
                printTable(events);
            } else {
                printInfo(events);
            }
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
});

function printTable(events) {
    $("#currentPageHeader").text("Eventer nær deg");
    if (events.length == 0) {
        document.getElementById("eventTable").innerHTML = "<p>Ingen eventer</p>";
    } else {
        console.log(events);
        let template = document.getElementById("listTemplate").innerHTML;
        console.log("template: " + template);
        let rendered = Pattern.render(template, events);
        document.getElementById("listTemplate").innerHTML = rendered;
    }
}

function printInfo(info) {
    console.log(info);
    $("#currentPageHeader").text(info[0]["type"]);

    let template = document.getElementById("infoTemplate").innerHTML;
    let rendered = Pattern.render(template, info);
    document.getElementById("infoTemplate").innerHTML = rendered;
}
