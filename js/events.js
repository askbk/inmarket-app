let eventTable;
let eventInfo;
let infoTemplate;
let listTemplate;

function events() {
    eventTable = document.getElementById("eventTable");
    eventInfo = document.getElementById("eventInfo");
    listTemplate = listTemplate || document.getElementById("listTemplate").innerHTML;
    infoTemplate = infoTemplate || document.getElementById("infoTemplate").innerHTML;
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
        let rendered = Pattern.render(listTemplate, events);
        eventTable.innerHTML += rendered;
        eventTable.classList.remove("w3-hide");
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
