let postTemplate, commentTemplate, commentInputTemplate, newPostInput,
    newPostContainer, curGroupId;

function group() {
    postTemplate = postTemplate || $("#postTemplate").html();
    newPostContainer = document.getElementById('newPostContainer');
    commentTemplate = commentTemplate || document.getElementById("commentTemplate").innerHTML;
    commentInputTemplate = commentInputTemplate || document.getElementById("commentInputTemplate").innerHTML;
    newPostInput = newPostInput || document.getElementById("newPostInput")
    curGroupId = Router.getParameters()[2];

    $("#currentPageHeader").text("Gruppe");

    const isGroupAdmin = JSON.parse(localStorage.adminGroups)
                            .filter(g => g == Router.getParameters()[2]);

    if (isGroupAdmin.length != 0) {
        newPostContainer.classList.remove("w3-hide");
    }

    commentInputTemplate = commentInputTemplate.replace("{{name}}", localStorage.name);
    commentInputTemplate = commentInputTemplate.replace("{{user_id}}", localStorage.id);

    GroupModel.getPosts(curGroupId)
        .then(
            result => {
                console.log(result);
                GroupController.printPosts(result);
            }
        );

    let contentRetrieval = setInterval(
        () => {
            GroupModel.getNewContent(
                curGroupId,
                GroupController.getLastPostId() || 0,
                GroupController.getPostIds() || [],
                GroupController.latestCommentId() || 0
            )
                .then(
                    result => {
                        GroupController.printNewPosts(result.posts);
                        GroupController.printNewComments(result.comments);
                    }
                );
        },
        1000
    );

    window.addEventListener("hashchange", () => {
        clearInterval(contentRetrieval);
    });
}

$(document).on("submit", '.commentInputForm', function(ev) {
    ev.preventDefault();
    const postId = ($(this).parentsUntil("li.postWrapper").prev().last().attr("id")).replace( /^\D+/g, '')
    const comment = $(this).children().first().val();
    GroupModel.createNewComment(comment, postId);
    ev.currentTarget.firstElementChild.value = "";
});

$(document).on("click", "#createNewPost", () => {
    GroupModel.createNewPost(document.getElementById("newPostInput").value)
        .then(() => {
            GroupController.emptyPostInput();
        });
});

const GroupModel = {
    getPosts(groupId) {
        return new Promise(
            (resolve, reject) => {
                console.log(curGroupId);
                $.ajax({
                    url: 'php/getGroupPosts.php',
                    beforeSend: request=> {
                        request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
                    },
                    type: 'POST',
                    data: "groupId=" + groupId,
                    success: data => {
                        resolve(JSON.parse(data));
                    },
                    error: (xhr, textStatus, errorThrown) => {
                        if (xhr.status == 401) {
                            location.hash = "/innlogging";
                            console.log("not logged in");
                        } else {
                            console.log("error: " + xhr.status);
                        }
                        reject("error");
                    }
                });
            }
        )
    },
    getNewContent(groupId, prevPostId, postIds, prevCommId) {
        const postParams = {
            "groupId"       : groupId,
            "prevPostId"    : prevPostId,
            "postIds"       : postIds,
            "prevCommId"    : prevCommId
        };
        return new Promise(
            (resolve, reject) => {
                $.ajax({
                    url: 'php/getGroupPosts.php',
                    beforeSend: request=> {
                        request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
                    },
                    type: 'POST',
                    data: postParams,
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
            }
        );

    },
    createNewPost(post) {
        post = post.trim();

        if (post == "") {
            return false;
        }

        const data = {
            groupId : Router.getParameters()[2],
            content : post
        };
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'php/createGroupPost.php',
                beforeSend: request=> {
                    request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
                },
                type: 'POST',
                data: data,
                success: () => {
                    resolve("success");
                },
                error: () => {
                    console.log("not logged in");
                    location.hash = "/innlogging";
                    resolve("error");
                }
            });
        });
    },
    createNewComment(comment, postId) {
        comment = comment.trim();

        if (comment == "") {
            return false;
        }

        const data = {
            postId : postId,
            content : comment
        };
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'php/createGroupComment.php',
                beforeSend: request=> {
                    request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
                },
                type: 'POST',
                data: data,
                success: () => {
                    resolve("success");
                },
                error: () => {
                    console.log("not logged in");
                    location.hash = "/innlogging";
                    reject("error");
                }
            });
        });
    }
}

const GroupController = {
    printPosts(posts) {
        for (post of posts) {
            const commentSection = "<ul class='w3-ul commentSection w3-card w3-round bg-white'>" + Pattern.render(commentTemplate, post.comments) + commentInputTemplate + "</ul>";
            const opSection = Pattern.render(postTemplate, post.OP)
            $("#groupPosts").append("<li class='postWrapper bg-light-grey'>" + opSection + commentSection + "</li>")
        }
    },
    printNewPosts(posts) {
        for (post of posts) {
            const commentSection = "<ul class='w3-ul commentSection w3-card w3-round bg-white'>" + commentInputTemplate + "</ul>";
            const opSection = Pattern.render(postTemplate, post.OP)
            $("#groupPosts").prepend("<li class='postWrapper bg-light-grey'>" + opSection + commentSection + "</li>")
        }
    },
    printNewComments(comments) {
        for (comment of comments) {
            $("#post" + comment.post_id).next().children().last().before(Pattern.render(commentTemplate, [comment]));
        }
    },
    latestCommentId() {
        let max = -1;
        $("#groupPosts").children().children(".commentSection").children().each(function () {
            let currId = $(this).children().first().attr("id");

            if (currId) {
                currId = Number(currId.replace( /^\D+/g, ''));
                if (currId > max) {
                    max = currId;
                }
            }
        });

        return max;
    },
    getPostIds() {
        let ids = [];
        $("#groupPosts").children().children(".w3-panel").each(function() {
            let currId = $(this).attr("id");

            if (typeof currId !== 'undefined') {
                currId = currId.replace( /^\D+/g, '');
                ids.push(currId);
            }
        });
        return ids;
    },
    getLastPostId() {
        let el = $("#groupPosts").children().first().children().first().attr("id");
        return el == undefined ? null : el.replace( /^\D+/g, '');
    },
    emptyPostInput() {
        document.getElementById("newPostInput").value = "";
    }
}
