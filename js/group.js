let postTemplate, commentTemplate, commentInputTemplate, newPostInput, newPostContainer;

function group() {
    postTemplate = postTemplate || $("#postTemplate").html();
    newPostContainer = document.getElementById('newPostContainer');
    commentTemplate = commentTemplate || document.getElementById("commentTemplate").innerHTML;
    commentInputTemplate = commentInputTemplate || document.getElementById("commentInputTemplate").innerHTML;
    newPostInput = newPostInput || document.getElementById("newPostInput")

    let postParams = {
        "groupId"   : Router.getParameters()[2],
        "count"     : 10,
        "offset"    : 0
    };

    $("#currentPageHeader").text("Gruppe");

    let adminGroups = JSON.parse(localStorage.adminGroups);

    let isGroupAdmin = adminGroups.filter(g => g == Router.getParameters()[2]);

    if (isGroupAdmin.length != 0) {
        newPostContainer.classList.remove("w3-hide");
    }

    commentInputTemplate = commentInputTemplate.replace("{{name}}", localStorage.name);
    commentInputTemplate = commentInputTemplate.replace("{{user_id}}", localStorage.id);

    $.ajax({
        url: 'php/getGroupPosts.php',
        beforeSend: function(request){
            request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
        },
        type: 'POST',
        data: postParams,
        success: function(data) {
            let posts = JSON.parse(data);
            printPosts(posts);
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

function createNewPost() {
    let post = newPostInput.value;
    post = post.trim();

    if (post == "") {
        return false;
    }

    let data = {
        groupId : Router.getParameters()[2],
        content : post
    };

    $.ajax({
        url: 'php/createGroupPost.php',
        beforeSend: function(request){
            request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
        },
        type: 'POST',
        data: data,
        success: function(id) {
            printNewPost([{
                content :   post,
                name    :   localStorage.name,
                post_id :   id,
                poster  :   localStorage.id
            }]);
            newPostInput.value = "";
        },
        error: function() {
            console.log("not logged in");
            location.hash = "/innlogging";
        }
    });
}

function createNewComment(comment, postId) {
    comment = comment.trim();

    if (comment == "") {
        return false;
    }

    let data = {
        postId : postId,
        content : comment
    };

    $.ajax({
        url: 'php/createGroupComment.php',
        beforeSend: function(request){
            request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
        },
        type: 'POST',
        data: data,
        success: function(id) {
            printNewComments([{
                content         :   comment,
                name            :   localStorage.name,
                postComment_id  :   id,
                poster          :   localStorage.id,
                post_id         :   postId
            }]);
        },
        error: function() {
            console.log("not logged in");
            location.hash = "/innlogging";
        }
    });
}

function printPosts(posts) {
    for (post of posts) {
        let commentSection = "<ul class='w3-ul commentSection w3-card w3-round bg-white'>" + Pattern.render(commentTemplate, post.comments) + commentInputTemplate + "</ul>";
        let opSection = Pattern.render(postTemplate, post.OP)
        $("#groupPosts").append("<li class='postWrapper bg-light-grey'>" + opSection + commentSection + "</li>")
    }

    $("form").submit(function (ev) {
        ev.preventDefault();
        let postId = ($(this).parentsUntil("li.postWrapper").prev().last().attr("id")).replace( /^\D+/g, '')
        let comment = $(this).children().first().val();
        createNewComment(comment, postId);
        ev.currentTarget.firstElementChild.value = "";
    });
}

function printNewPost(post) {
    let commentSection = "<ul class='w3-ul commentSection w3-card w3-round bg-white'>" + commentInputTemplate + "</ul>";
    let opSection = Pattern.render(postTemplate, post)
    $("#groupPosts").prepend("<li class='postWrapper bg-light-grey'>" + opSection + commentSection + "</li>")
}

function printNewComments(comments) {
    for (comment of comments) {
        $("#post" + comment.post_id).next().children().last().before(Pattern.render(commentTemplate, [comment]));
    }
}

function getNewContent() {

    let postParams = {
        "groupId"       : Router.getParameters()[2],
        "prevPostId"    : ($("#groupPosts").children().first().children().first().attr("id")).replace( /^\D+/g, ''),
        "prevCommId"    : ($("#groupPosts").children().first().children().last().attr("id")).replace( /^\D+/g, '')
    };

    $.ajax({
        url: 'php/getNewGroupContent.php',
        beforeSend: function(request){
            request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
        },
        type: 'POST',
        data: postParams,
        success: function(data) {
            let content = JSON.parse(data);

            if (content.post.length > 0) {
                printPosts(content.post);
            }

            if (content.comment.length > 0) {
                printNewComments(content.comment);
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
}
