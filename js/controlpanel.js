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
        switch (type) {
            case "group":
                groupControls(ev.currentTarget.attributes.groupid.value);
                break;
            default:
                break;
        }
    });

}

function groupControls(groupId) {
    printMemberList(groupId);

    let addMemberInput = document.getElementById("addMemberInput"),
        memberSearchResults = document.getElementById("memberSearchResults"),
        memberSearchResultsTemplate = document.getElementById("memberSearchResultsTemplate").innerHTML;

    addMemberInput.addEventListener("keyup", function () {
        $.ajax({
            url: 'php/search.php',
            beforeSend: function(request){
                request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
            },
            type: 'POST',
            data: "q=" + addMemberInput.value + "&exclusiveGroupSearch=" + groupId,
            success: function(data) {
                if (data.length > 0) {
                    memberSearchResults.innerHTML = Pattern.render(memberSearchResultsTemplate, JSON.parse(data));
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
    $(document).on("click", '.addMember', function (ev) {
        ev.preventDefault();
        let newMemberId = ev.currentTarget.attributes.userid.value;
        console.log("click");
        $.ajax({
            url: 'php/addGroupMember.php',
            beforeSend: function(request){
                request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
            },
            type: 'POST',
            data: "groupId=" + groupId + "&memberId=" + newMemberId,
            success: function(data) {
                $(this).remove();
                printMemberList(groupId);
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

    $(document).on("click", '.removeMember', function (ev) {
        ev.preventDefault();
        let user_id = ev.currentTarget.attributes.userid.value;

        $.ajax({
            url: 'php/removeGroupMember.php',
            beforeSend: function(request){
                request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
            },
            type: 'POST',
            data: "groupId=" + groupId + "&removeId=" + user_id,
            success: function(data) {
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
}

function printMemberList(groupId) {
    let memberList;
    $.ajax({
        url: 'php/getGroupMembers.php',
        beforeSend: function(request){
            request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
        },
        type: 'POST',
        data: "groupId=" + groupId,
        success: function(data) {
            let memberList = JSON.parse(data);
            modalList.innerHTML = Pattern.render(groupMembersTemplate, memberList);
            document.getElementById("modalListType").innerHTML = "Gruppemedlemmer";
            document.getElementById('modal').style.display = 'block';
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
