let postTemplate;
let commentTemplate;

function group() {
    let postParams = {
        "groupId"   : Router.getParameters()[2],
        "count"     : 10,
        "offset"    : 0
    };

    $.ajax({
        url: 'php/getGroupPosts.php',
        beforeSend: function(request){
            request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
        },
        type: 'POST',
        data: postParams,
        success: function(data) {
            let posts = JSON.parse(data);
            console.log(posts);
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

    postTemplate = $("#postTemplate").html();
    commentTemplate = document.getElementById("commentTemplate").innerHTML;
    $("#currentPageHeader").text("Gruppe");
}

function createNewPost() {
    let post = document.getElementById("newPostInput").value;
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
            document.getElementById("newPostInput").value = "";
        },
        error: function() {
            console.log("not logged in");
            location.hash = "/innlogging";
        }
    });
}

function printPosts(posts) {
    for (post of posts) {
        let commentSection = "<ul class='w3-ul'>" + Pattern.render(commentTemplate, post.comments) + "</ul>";
        let opSection = Pattern.render(postTemplate, post.OP)
        $("#groupPosts").append("<li>" + opSection + commentSection + "</li>")
    }
}

function printNewPost(post) {
    let commentSection = "<ul class='w3-ul'></ul>";
    let opSection = Pattern.render(postTemplate, post)
    $("#groupPosts").prepend("<li>" + opSection + commentSection + "</li>")
}

function printNewComments(comments) {

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
