let eventTable;
let eventInfo;
let infoTemplate;

function events() {
    eventTable = eventTable || document.getElementById("eventTable");
    eventInfo = eventInfo || document.getElementById("eventInfo");
    infoTemplate = infoTemplate || document.getElementById("infoTemplate");
    let parameter = -1;
    if (Router.getParameters().length == 3) {
        parameter = Router.getParameters()[2];
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
                bottomNav.classList.add("w3-hide");
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
}

function printTable(events) {
    $("#currentPageHeader").text("Eventer nær deg");
    if (events.length == 0) {
        eventTable.innerHTML = "<p>Ingen eventer</p>";
    } else {
        //console.log(events);
        let template = listTemplate.innerHTML;
        //console.log("template: " + template);
        let rendered = Pattern.render(template, events);
        listTemplate.innerHTML = rendered;
        listTemplate.classList.remove("w3-hide");
        // localStorage.eventTable =
    }
}

function printInfo(info) {
    //console.log(info);
    $("#currentPageHeader").text(info[0]["type"]);
    let template = infoTemplate.innerHTML;
    let rendered = Pattern.render(template, info);
    infoTemplate.innerHTML = rendered;
    eventInfo.classList.remove("w3-hide");
}
