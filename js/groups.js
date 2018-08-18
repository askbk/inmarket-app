let groupListCont;
let groupListTemplate;

function groups() {
    $("#currentPageHeader").text("Grupper");
    document.title = "Grupper | InMarket App";

    $.ajax({
        url: 'php/getGroups.php',
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
    groupListCont = groupListCont || document.getElementById("groupList");
    groupListTemplate = groupListTemplate || document.getElementById("template");
    if (groupList.length == 0) {
        groupListCont.innerHTML = "Du er ikke med i noen grupper.";
    } else {
        let rendered = Pattern.render(groupListTemplate.innerHTML, groupList);
        groupListTemplate.innerHTML = rendered;
    }
    groupListCont.classList.remove("w3-hide");
}
