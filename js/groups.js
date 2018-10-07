let groupsCont, groupListTemplate;

function groups() {
    $("#currentPageHeader").text("Grupper");
    document.title = "Grupper | InMarket App";

    GroupsModel.getGroupList(localStorage.id)
        .then(
            result => {
                GroupsController.printGroupList(result);
            }
        );
}

const GroupsModel = {
    getGroupList    : userId => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'php/getGroup.php',
                beforeSend: request => {
                    request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
                },
                type: 'POST',
                success: data => {
                    resolve(JSON.parse(data));
                },
                error: (xhr, textStatus, errorThrown) => {
                    if (xhr.status == 401) {
                        console.log("not logged in");
                        location.hash = "/innlogging";
                    } else {
                        console.log("error: " + xhr.status);
                    }
                }
            });
        });
    }
}

const GroupsController = {
    printGroupList  : groupList => {
        groupsCont = document.getElementById("groupList");
        groupListTemplate = document.getElementById("groupListTemplate").innerHTML;
        if (groupList.length == 0) {
            groupsCont.innerHTML = "Du er ikke med i noen grupper.";
        } else {
            groupsCont.innerHTML = Pattern.render(groupListTemplate, groupList);
        }
        document.getElementById("groups").classList.remove("w3-hide");
    }
}
