let eventControlSection, groupControlSection, conversationControlSection,
    groupControlListTemplate, groupMemberList, groupMembersTemplate,
    memberSearchResultsTemplate, memberSearchResults, conversationParticipantList,
    conversationListTemplate;

function controlpanel() {
    if (localStorage.adminLevel == 0) {
        location.hash = "/hjem";
    }

    groupsCont = document.getElementById("groupList");
    groupMemberList = document.getElementById("groupMemberList");
    conversationParticipantList = document.getElementById("conversationParticipantList");
    groupMembersTemplate = document.getElementById("groupMembersTemplate").innerHTML;

    memberSearchResults = document.getElementById("memberSearchResults");
    memberSearchResultsTemplate = memberSearchResultsTemplate || document.getElementById("memberSearchResultsTemplate").innerHTML;

    participantSearchResults = document.getElementById("participantSearchResults");
    participantSearchResultsTemplate = document.getElementById("participantSearchResultsTemplate").innerHTML;

    ControlpanelModel.getAdminGroups(localStorage.id)
        .then(
            result => {
                GroupsController.printGroupList(result);
            }
        );

    MessagesModel.getMessageList(localStorage.id, 0)
        .then(
            result => {
                MessagesController.printMessageList(result, document.getElementById("conversationList"),
                                                    document.getElementById("conversationListTemplate").innerHTML);
            }
        );

    addMemberInput.addEventListener("keyup", () => {
        ControlpanelModel.searchNonMembers(addMemberInput.value, localStorage.controlPanelGroupId)
            .then(
                result => {
                    ControlpanelController.printSearchResults(memberSearchResultsTemplate, result, memberSearchResults);
                }
            );
    });

    addParticipantInput.addEventListener("keyup", () => {
        ControlpanelModel.searchNonParticipants(addParticipantInput.value, localStorage.controlPanelConversationId)
            .then(
                result => {
                    ControlpanelController.printSearchResults(participantSearchResultsTemplate, result, participantSearchResults);
                }
            );
    });
}

$(document).on("click", '.addMember', ev => {
    const newMemberId = ev.currentTarget.attributes.userid.value;
    ControlpanelModel.addGroupMember(localStorage.controlPanelGroupId, newMemberId)
        .then(() => {
            ControlpanelController.addGroupMember(ev.currentTarget);
            return ControlpanelModel.getGroup(localStorage.controlPanelGroupId);
        })
        .then(
            result => {
                ControlpanelController.printMemberList(result.members, groupMemberList);
            }
        );
});

$(document).on("click", ".addParticipant", (ev) => {
    const newParticipantId = ev.currentTarget.attributes.userid.value;
    ControlpanelModel.addParticipant(newParticipantId,
        localStorage.controlPanelConversationId)
        .then(() => {
            ControlpanelController.addParticipant(ev.currentTarget);
            return ControlpanelModel.getConversation(localStorage.controlPanelConversationId);
        })
        .then(
            result => {
                console.log(result);
                ControlpanelController.printParticipantList(result.participants, conversationParticipantList);
            }
        );
});

$(document).on("click", ".removeMember", (ev) => {
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

$(document).on("click", ".dropdownToggle", (ev) => {
    ControlpanelController.dropdownToggle(ev.currentTarget);
});

$(document).on("blur", ".dropdownToggle", (ev) => {
    ControlpanelController.dropdownHide(ev.currentTarget);
});

$(document).on("click", '.groupItem', (ev) => {
    const addMemberInput = document.getElementById("addMemberInput"),
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

$(document).on("click", '.conversationItem', (ev) => {
    const addParticipantInput = document.getElementById("addParticipantInput"),
        conversationId = ev.currentTarget.attributes.conversationid.value;

    localStorage.controlPanelConversationId = conversationId;

    ControlpanelModel.getConversation(conversationId)
        .then(
            result => {
                ControlpanelController.printParticipantList(result.participants, conversationParticipantList);
            }
        )
        .then(
            () => {
                ControlpanelController.showConversationControls();
            }
        );
});

$(document).on("click", "#createNewGroupButton", () => {
    ControlpanelController.showGroupCreation();
});

$(document).on("click", "#createGroupButton", () => {
    const name = document.getElementById("newGroupName").value,
        description = document.getElementById("newGroupDescription").value;

    ControlpanelModel.createGroup(name, description)
        .then(() => {
            ControlpanelController.hideGroupCreation()
        })
        .then(() => {
            return ControlpanelModel.getAdminGroups(localStorage.id)
        })
        .then(
            result => {
                GroupsController.printGroupList(result);
        })
        .then(() => {
            return MessagesModel.getMessageList(localStorage.id, 0)
        })
        .then(result => {
            MessagesController.printMessageList(result, document.getElementById("conversationList"),
                                                document.getElementById("conversationListTemplate").innerHTML);
        });
});

$(document).on("click", "#startNewConversationButton", () => {
    ControlpanelController.showConversationCreation();
});

$(document).on("click", "#createConversationButton", () => {
    const name = document.getElementById("newConversationName").value;

    ControlpanelModel.createConversation(name)
        .then(() => {
            ControlpanelController.hideConversationCreation();
            document.getElementById("newConversationName").value = "";
        })
        .then(() => {
            return MessagesModel.getMessageList(localStorage.id, 0)
        })
        .then(result => {
            MessagesController.printMessageList(result, document.getElementById("conversationList"),
                                                document.getElementById("conversationListTemplate").innerHTML);
        });
})

const ControlpanelModel = {
    getGroup                : groupId => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'php/getGroup.php',
                beforeSend: request => {
                    request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
                },
                type: 'POST',
                data: "groupId=" + groupId + "&members=1&details=1",
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
                    reject("error");
                }
            });
        });
    },
    getConversation         : conversationId =>{
        return new Promise((resolve, reject) =>{
            $.ajax({
                url: 'php/getConversation.php',
                beforeSend: request =>{
                    request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
                },
                type: 'POST',
                data: "conversationId=" + conversationId + "&participants=1&details=1",
                success: data =>{
                    resolve(JSON.parse(data));
                },
                error: (xhr, textStatus, errorThrown) =>{
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
    getAdminGroups          : userId => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'php/getGroup.php',
                beforeSend: request => {
                    request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
                },
                type: 'POST',
                data: "adminGroups=1",
                success: data => {
                    const adminG = JSON.parse(data);
                    let result = [];
                    for (g of adminG) {
                        result.push(g.group_id);
                    }
                    localStorage.adminGroups = JSON.stringify(result);
                    resolve(adminG);
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
    },
    removeGroupMember       : (groupId, userId) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'php/removeGroupMember.php',
                beforeSend: request => {
                    request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
                },
                type: 'POST',
                data: "groupId=" + groupId + "&removeId=" + userId,
                success: data => {
                    resolve(true);
                },
                error: (xhr, textStatus, errorThrown) => {
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
    addGroupMember          : (groupId, newMemberId) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'php/addGroupMember.php',
                beforeSend: request => {
                    request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
                },
                type: 'POST',
                data: "groupId=" + groupId + "&memberId=" + newMemberId,
                success: data => {
                    resolve(true);
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
    },
    searchNonMembers        : (query, groupId) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'php/search.php',
                beforeSend: request => {
                    request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
                },
                type: 'POST',
                data: "q=" + query + "&exclusiveGroupSearch=" + groupId,
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
    },
    searchNonParticipants   : (query, conversationId) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'php/search.php',
                beforeSend: request => {
                    request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
                },
                type: 'POST',
                data: "q=" + query + "&exclusiveConversationSearch=1&conversationId=" + conversationId,
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
    },
    addParticipant          : (userId, conversationId) => {
        console.log(userId + " " + conversationId);
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'php/addConversationParticipant.php',
                beforeSend: request => {
                    request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
                },
                type: 'POST',
                data: "conversationId=" + conversationId + "&participantId=" + userId,
                success: data => {
                    resolve(true);
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
    },
    messageMember           : userId => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'php/startConversation.php',
                beforeSend: request => {
                    request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
                },
                type: 'POST',
                data: "userId=" + userId,
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
    },
    createGroup             : (name, description) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'php/createGroup.php',
                beforeSend: (request) => {
                    request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
                },
                type: 'POST',
                data: "name=" + name + "&description=" + description,
                success: data => {
                    resolve(true)
                },
                complete : data => {

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
    },
    createConversation      : name => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'php/createConversation.php',
                beforeSend: (request) => {
                    request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
                },
                type: 'POST',
                data: "name=" + name,
                success: data => {
                    resolve(true)
                },
                complete : data => {

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

const ControlpanelController = {
    dropdownHide(el) {
        el.nextElementSibling.classList.remove("w3-show");
    },
    dropdownShow(el) {
        el.nextElementSibling.classList.add("w3-show");
    },
    dropdownToggle(el) {
        el.nextElementSibling.classList.toggle("w3-show");
    },
    printMemberList(memberList, container) {
        console.log(memberList);
        container.innerHTML = Pattern.render(groupMembersTemplate, memberList);
    },
    addGroupMember(el) {
        $(el).parent().remove();
    },
    addParticipant(el) {
        $(el).parent().remove();
    },
    printSearchResults(template, results, target) {
        if (results.length > 0) {
            target.innerHTML = Pattern.render(template, results);
        } else {
            target.innerHTML = "";
        }
    },
    printParticipantList(participants, target) {
            target.innerHTML = Pattern.render(groupMembersTemplate, participants);
    },
    showGroupControls() {
        document.getElementById("groupModal").style.display = "block";
    },
    showConversationControls() {
        document.getElementById("conversationModal").style.display = "block";
    },
    showGroupCreation() {
        document.getElementById("createGroupModal").style.display = "block";
    },
    hideGroupCreation() {
        document.getElementById("createGroupModal").style.display = "none";
    },
    showConversationCreation() {
        document.getElementById("createConversationModal").style.display = "block";
    },
    hideConversationCreation() {
        document.getElementById("createConversationModal").style.display = "none";
    },
    messageMember(convId) {
        location.hash = "/conversation/" + convId;
    }
}
