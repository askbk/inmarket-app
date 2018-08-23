let eventControlSection, groupControlSection, conversationControlSection, groupControlListTemplate;

function controlpanel() {
    if (localStorage.adminLevel == 0) {
        location.hash = "/hjem";
    }

    groupsCont = document.getElementById("groupList");

    $.ajax({
        url: 'php/getAdminGroups.php',
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
