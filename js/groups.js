let groupsCont;
let groupListTemplate;

function groups() {
    $("#currentPageHeader").text("Grupper");
    document.title = "Grupper | InMarket App";

    $.ajax({
        url: 'php/getGroup.php',
        beforeSend: function(request){
            request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
        },
        type: 'POST',
        success: function(data) {
            let groupList = JSON.parse(data);
            printGroupList(groupList);
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

function printGroupList(groupList) {
    groupsCont = document.getElementById("groupList");
    groupListTemplate = document.getElementById("groupListTemplate").innerHTML;
    if (groupList.length == 0) {
        groupsCont.innerHTML = "Du er ikke med i noen grupper.";
    } else {
        let rendered = Pattern.render(groupListTemplate, groupList);
        groupsCont.innerHTML = rendered;
    }
    document.getElementById("groups").classList.remove("w3-hide");
}
