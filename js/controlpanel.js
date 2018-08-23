let eventControlSection, groupControlSection, conversationControlSection,
    groupControlListTemplate, modalList, groupMembersTemplate;

function controlpanel() {
    if (localStorage.adminLevel == 0) {
        location.hash = "/hjem";
    }

    groupsCont = document.getElementById("groupList");
    modalList = document.getElementById("modalList");
    groupMembersTemplate = document.getElementById("groupMembersTemplate").innerHTML;

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

    $(document).on("click", 'button', function (ev) {
        ev.preventDefault();
        let type = ev.currentTarget.name;
        console.log();
        switch (type) {
            case "group":
                groupControls(ev.currentTarget.attributes.groupid.value);
                break;
            default:
                break;
        }
    });
    $(document).on("click", '.removeMember', function (ev) {
        ev.preventDefault();
        let user_id = ev.currentTarget.attributes.userid.value;

        $.ajax({
            url: 'php/removeGroupMember.php',
            beforeSend: function(request){
                request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
            },
            type: 'POST',
            data: "groupId=" + groupId + "&removeId" + user_id,
            success: function(data) {
                let memberList = JSON.parse(data);
                printMemberList(memberList);
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
        $(document).on("change", '#addMemberInput', function (ev) {
            ev.preventDefault();
            console.log(ev);
        });
        $(document).on("submit", '#addGroupMemberForm', function (ev) {
            ev.preventDefault();
            console.log(ev);
        });
    });
}

function groupControls(groupId) {
    $.ajax({
        url: 'php/getGroupMembers.php',
        beforeSend: function(request){
            request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
        },
        type: 'POST',
        data: "groupId=" + groupId,
        success: function(data) {
            let memberList = JSON.parse(data);
            printMemberList(memberList);
            document.getElementById("groupModalContent").classList.remove("w3-hide");
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

function printMemberList(memberList) {
    modalList.innerHTML = Pattern.render(groupMembersTemplate, memberList);
    document.getElementById("modalListType").innerHTML = "Gruppemedlemmer";
    document.getElementById('modal').style.display = 'block';
}
