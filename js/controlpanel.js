let eventControlSection, groupControlSection, conversationControlSection,
    groupControlListTemplate, groupMemberList, groupMembersTemplate,
    memberSearchResultsTemplate, memberSearchResults;

function controlpanel() {
    if (localStorage.adminLevel == 0) {
        location.hash = "/hjem";
    }

    groupsCont = document.getElementById("groupList");
    groupMemberList = document.getElementById("groupMemberList");
    groupMembersTemplate = document.getElementById("groupMembersTemplate").innerHTML;
    memberSearchResults = document.getElementById("memberSearchResults");
    memberSearchResultsTemplate = memberSearchResultsTemplate || document.getElementById("memberSearchResultsTemplate").innerHTML;

    ControlpanelModel.getAdminGroups(localStorage.id)
        .then(
            result => {
                GroupsController.printGroupList(result);
            }
        );

    addMemberInput.addEventListener("keyup", function () {
        ControlpanelModel.searchNonMembers(addMemberInput.value, localStorage.controlPanelGroupId)
            .then(
                result => {
                    ControlpanelController.printSearchResults(result, memberSearchResults);
                }
            );
    });
}

$(document).on("click", '.addMember', function (ev) {
    let newMemberId = ev.currentTarget.attributes.userid.value;
    ControlpanelModel.addGroupMember(localStorage.controlPanelGroupId, newMemberId)
        .then(() => {
            ControlpanelController.addGroupMember(ev.currentTarget);
            return ControlpanelModel.getGroup(localStorage.controlPanelGroupId);
        })
        .then(
            result => {
                console.log(result);
                ControlpanelController.printMemberList(result.members, groupMemberList);
            }
        );
});

$(document).on("click", ".removeMember", function (ev) {
    console.log("helo");

    ControlpanelModel.removeGroupMember(ev.currentTarget)
        .then(
            () => {
                ControlpanelModel.getGroup(localStorage.controlPanelGroupId)
            }
        )
        .then(
            result => {
                ControlpanelController.printMemberList(result.members, groupMemberList);
            }
        );
});

$(document).on("click", ".dropdownToggle", function (ev) {
    ControlpanelController.dropdownToggle(ev.currentTarget);
});

$(document).on("blur", ".dropdownToggle", function (ev) {
    ControlpanelController.dropdownHide(ev.currentTarget);
})

$(document).on("click", '.groupItem', function (ev) {
    let addMemberInput = document.getElementById("addMemberInput"),
        memberSearchResults = document.getElementById("memberSearchResults"),
        memberSearchResultsTemplate = document.getElementById("memberSearchResultsTemplate").innerHTML,
        groupId = ev.currentTarget.attributes.groupid.value;

    localStorage.controlPanelGroupId = groupId;


    ControlpanelModel.getGroup(groupId)
        .then(
            result => {
                ControlpanelController.printMemberList(result.members, groupMemberList);
            }
        )
        .then(
            () => {
                ControlpanelController.showGroupControls();
            }
        );
});

$(document).on("click", "#createNewGroupButton", function () {
    ControlpanelController.showGroupCreation();
});

$(document).on("click", "#createGroupButton", function () {
    let name = document.getElementById("newGroupName").value,
        description = document.getElementById("newGroupDescription").value;

    ControlpanelModel.createGroup(name, description)
        .then(() => {
            ControlpanelController.hideGroupCreation()
        })
        .then(() => {
            ControlpanelModel.getAdminGroups(localStorage.id)
        })
        .then(
            result => {
                console.log(result);
                GroupsController.printGroupList(result);
        });
});

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

}

let ControlpanelModel = {
    getGroup            : function (groupId) {
        return new Promise(function(resolve, reject) {
            $.ajax({
                url: 'php/getGroup.php',
                beforeSend: function(request){
                    request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
                },
                type: 'POST',
                data: "groupId=" + groupId + "&members=1&details=1",
                success: function(data) {
                    resolve(JSON.parse(data));
                },
                error: function(xhr, textStatus, errorThrown) {
                    if (xhr.status == 401) {
                        console.log("not logged in");
                        location.hash = "/innlogging";
                    } else {
                        console.log("error: " + xhr.status);
                    }
                    reject("error");
                }
            });
        });
    },
    getAdminGroups      : function (userId) {
        return new Promise(function(resolve, reject) {
            $.ajax({
                url: 'php/getGroup.php',
                beforeSend: function(request){
                    request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
                },
                type: 'POST',
                data: "adminGroups=1",
                success: function(data) {
                    resolve(JSON.parse(data));
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
    },
    removeGroupMember   : function (groupId, userId) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'php/removeGroupMember.php',
                beforeSend: function(request){
                    request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
                },
                type: 'POST',
                data: "groupId=" + groupId + "&removeId=" + userId,
                success: function(data) {
                    resolve(true);
                },
                error: function(xhr, textStatus, errorThrown) {
                    if (xhr.status == 401) {
                        console.log("not logged in");
                        location.hash = "/innlogging";
                    } else {
                        console.log("error: " + xhr.status);
                    }
                    reject("error");
                }
            });
        });
    },
    addGroupMember      : function (groupId, newMemberId) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: 'php/addGroupMember.php',
                    beforeSend: function(request){
                        request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
                    },
                    type: 'POST',
                    data: "groupId=" + groupId + "&memberId=" + newMemberId,
                    success: function(data) {
                        resolve(true);
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
    },
    searchNonMembers    : function (query, groupId) {
        return new Promise(function(resolve, reject) {
            $.ajax({
                url: 'php/search.php',
                beforeSend: function(request){
                    request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
                },
                type: 'POST',
                data: "q=" + query + "&exclusiveGroupSearch=" + groupId,
                success: function(data) {
                    resolve(JSON.parse(data));
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
    },
    messageMember       : function (userId) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'php/startConversation.php',
                beforeSend: function(request){
                    request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
                },
                type: 'POST',
                data: "userId=" + userId,
                success: function(data) {
                    resolve(JSON.parse(data));
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
    },
    createGroup         : function (name, description) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'php/createGroup.php',
                beforeSend: function(request){
                    request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
                },
                type: 'POST',
                data: "name=" + name + "&description=" + description,
                success: function(data) {
                    resolve(true)
                },
                complete : function (data) {

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
}

let ControlpanelController = {
    dropdownHide        : function (el) {
        el.nextElementSibling.classList.remove("w3-show");
    },
    dropdownShow        : function (el) {
        el.nextElementSibling.classList.add("w3-show");
    },
    dropdownToggle      : function (el) {
        el.nextElementSibling.classList.toggle("w3-show");
    },
    printMemberList     : function (memberList, container) {
        console.log(memberList);
        container.innerHTML = Pattern.render(groupMembersTemplate, memberList);
    },
    addGroupMember      : function (el) {
        $(el).parent().remove();
    },
    printSearchResults  : function (results, target) {
        if (results.length > 0) {
            target.innerHTML = Pattern.render(memberSearchResultsTemplate, results);
        } else {
            target.innerHTML = "";
        }
    },
    showGroupControls   : function () {
        document.getElementById("groupModal").style.display = "block";
    },
    showGroupCreation   : function () {
        document.getElementById("createGroupModal").style.display = "block";
    },
    hideGroupCreation   : function () {
        document.getElementById("createGroupModal").style.display = "none";
    },
    messageMember       : function (convId) {
        location.hash = "/conversation/" + convId;
    }
}
