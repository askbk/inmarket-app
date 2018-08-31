let eventControlSection, groupControlSection, conversationControlSection,
    groupControlListTemplate, groupMemberList, groupMembersTemplate;

function controlpanel() {
    if (localStorage.adminLevel == 0) {
        location.hash = "/hjem";
    }

    groupsCont = document.getElementById("groupList");
    groupMemberList = document.getElementById("groupMemberList");
    groupMembersTemplate = document.getElementById("groupMembersTemplate").innerHTML;

    $.ajax({
        url: 'php/getGroup.php',
        beforeSend: function(request){
            request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
        },
        type: 'POST',
        data: "adminGroups=1",
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

function groupControls(groupId) {
    document.getElementById("groupModal").style.display = "block";
    localStorage.controlPanelGroupId = groupId;

    let addMemberInput = document.getElementById("addMemberInput"),
        memberSearchResults = document.getElementById("memberSearchResults"),
        memberSearchResultsTemplate = document.getElementById("memberSearchResultsTemplate").innerHTML;

    $.ajax({
        url: 'php/getGroup.php',
        beforeSend: function(request){
            request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
        },
        type: 'POST',
        data: "groupId=" + groupId + "&members=1&details=1",
        success: function(data) {
            let details = JSON.parse(data);
            // groupMemberList.innerHTML = Pattern.render(groupMembersTemplate, details.members);
            printMemberList(details.members, groupMemberList);
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
                } else {
                    memberSearchResults.innerHTML = "";
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
}

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

$(document).on("click", ".removeMember", function (ev) {
    console.log("helo");

    removeMember(ev.currentTarget);
});

$(document).on("click", ".dropdownToggle", function (ev) {
    dropdownToggle(ev.currentTarget);
});

$(document).on("blur", ".dropdownToggle", function (ev) {
    dropdownHide(ev.currentTarget);
})

$(document).on("click", '.groupItem', function (ev) {
    ev.preventDefault();
    groupControls(ev.currentTarget.attributes.groupid.value);
});

function dropdownShow(el) {
    el.nextElementSibling.classList.add("w3-show");
}

function dropdownHide(el) {
    el.nextElementSibling.classList.remove("w3-show");
}

function dropdownToggle(el) {
    el.nextElementSibling.classList.toggle("w3-show");
}

function removeMember(el) {
    let user_id = el.attributes.userid.value;
    console.log(user_id);

    $.ajax({
        url: 'php/removeGroupMember.php',
        beforeSend: function(request){
            request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
        },
        type: 'POST',
        data: "groupId=" + localStorage.controlPanelGroupId + "&removeId=" + user_id,
        success: function(data) {
            $.ajax({
                url: 'php/getGroup.php',
                beforeSend: function(request){
                    request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
                },
                type: 'POST',
                data: "groupId=" + localStorage.controlPanelGroupId + "&members=1",
                success: function(data) {
                    let details = JSON.parse(data);
                    printMemberList(details.members, groupMemberList);
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

function messageMember(user_id) {
    $.ajax({
        url: 'php/startConversation.php',
        beforeSend: function(request){
            request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
        },
        type: 'POST',
        data: "userId=" + user_id,
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
}

function printMemberList(memberList, container) {
    container.innerHTML = Pattern.render(groupMembersTemplate, memberList);
}

let ControlpanelModel = {

}
