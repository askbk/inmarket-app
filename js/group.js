let postTemplate, commentTemplate, commentInputTemplate, newPostInput,
    newPostContainer, curGroupId = Router.getParameters()[2];

function group() {
    postTemplate = postTemplate || $("#postTemplate").html();
    newPostContainer = document.getElementById('newPostContainer');
    commentTemplate = commentTemplate || document.getElementById("commentTemplate").innerHTML;
    commentInputTemplate = commentInputTemplate || document.getElementById("commentInputTemplate").innerHTML;
    newPostInput = newPostInput || document.getElementById("newPostInput")
    curGroupId = Router.getParameters()[2];
    // curGroupId = 1;

    $("#currentPageHeader").text("Gruppe");

    const isGroupAdmin = JSON.parse(localStorage.adminGroups)
                            .filter(g => g == Router.getParameters()[2]);

    if (isGroupAdmin.length != 0) {
        newPostContainer.classList.remove("w3-hide");
    }

    commentInputTemplate = commentInputTemplate.replace("{{name}}", localStorage.name);
    commentInputTemplate = commentInputTemplate.replace("{{user_id}}", localStorage.id);

    const getContent = function() {
        GroupModel.getPosts(curGroupId)
            .then(
                result => {
                    console.log(result);
                    GroupController.printPosts(result);
                }
            );
    }

    getContent();

    let contentRetrieval = setInterval(
        function () {
            GroupModel.getNewContent(
                curGroupId,
                GroupController.getLastPostId(),
                GroupController.getPostIds(),
                GroupController.latestCommentId()
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

    window.addEventListener("hashchange", function () {
        clearInterval(contentRetrieval);
    })

    $(document).on("submit", '.commentInputForm', function (ev) {
        ev.preventDefault();
        let postId = ($(this).parentsUntil("li.postWrapper").prev().last().attr("id")).replace( /^\D+/g, '')
        let comment = $(this).children().first().val();
        GroupModel.createNewComment(comment, postId);
        ev.currentTarget.firstElementChild.value = "";
    });
}

let GroupModel = {
    getPosts        : function (groupId) {
        return new Promise(
            (resolve, reject) => {
                console.log(curGroupId);
                $.ajax({
                    url: 'php/getGroupPosts.php',
                    beforeSend: function(request){
                        request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
                    },
                    type: 'POST',
                    data: "groupId=" + groupId,
                    success: function(data) {
                        console.log(curGroupId);
                        let posts = JSON.parse(data);
                        resolve(posts);
                    },
                    error: function(xhr, textStatus, errorThrown) {
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
    getNewContent   : function (groupId, prevPostId, postIds, prevCommId) {
        let postParams = {
            "groupId"       : groupId,
            "prevPostId"    : prevPostId,
            "postIds"       : postIds,
            "prevCommId"    : prevCommId
        };
        return new Promise(
            (resolve, reject) => {
                $.ajax({
                    url: 'php/getGroupPosts.php',
                    beforeSend: function(request){
                        request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
                    },
                    type: 'POST',
                    data: postParams,
                    success: function(data) {
                        let content = JSON.parse(data);
                        resolve(content);
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
            }
        );

    },
    createNewPost   : function (post) {
        post = post.trim();

        if (post == "") {
            return false;
        }

        let data = {
            groupId : Router.getParameters()[2],
            content : post
        };
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'php/createGroupPost.php',
                beforeSend: function(request){
                    request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
                },
                type: 'POST',
                data: data,
                success: function() {
                    resolve("success");
                },
                error: function() {
                    console.log("not logged in");
                    location.hash = "/innlogging";
                    resolve("error");
                }
            });
        });
    },
    createNewComment: function (comment, postId) {
        comment = comment.trim();

        if (comment == "") {
            return false;
        }

        let data = {
            postId : postId,
            content : comment
        };
        return new Promise(function(resolve, reject) {
            $.ajax({
                url: 'php/createGroupComment.php',
                beforeSend: function(request){
                    request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
                },
                type: 'POST',
                data: data,
                success: function() {
                    resolve("success");
                },
                error: function() {
                    console.log("not logged in");
                    location.hash = "/innlogging";
                    reject("error");
                }
            });
        });
    }
}

let GroupController = {
    printPosts      : function (posts) {
        for (post of posts) {
            let commentSection = "<ul class='w3-ul commentSection w3-card w3-round bg-white'>" + Pattern.render(commentTemplate, post.comments) + commentInputTemplate + "</ul>";
            let opSection = Pattern.render(postTemplate, post.OP)
            $("#groupPosts").append("<li class='postWrapper bg-light-grey'>" + opSection + commentSection + "</li>")
        }
    },
    printNewPosts   : function (posts) {
        for (post of posts) {
            let commentSection = "<ul class='w3-ul commentSection w3-card w3-round bg-white'>" + commentInputTemplate + "</ul>";
            let opSection = Pattern.render(postTemplate, post.OP)
            $("#groupPosts").prepend("<li class='postWrapper bg-light-grey'>" + opSection + commentSection + "</li>")
        }
    },
    printNewComments: function (comments) {
        for (comment of comments) {
            $("#post" + comment.post_id).next().children().last().before(Pattern.render(commentTemplate, [comment]));
        }
    },
    latestCommentId : function () {
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
    getPostIds      : function () {
        let ids = [];
        $("#groupPosts").children().children(".w3-panel").each(function () {
            let currId = $(this).attr("id");

            if (typeof currId !== 'undefined') {
                currId = currId.replace( /^\D+/g, '');
                ids.push(currId);
            }
        });
        return ids;
    },
    getLastPostId   : function () {
        return ($("#groupPosts").children().first().children().first().attr("id")).replace( /^\D+/g, '');
    }
}
