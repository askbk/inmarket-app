export class GroupComponent {
    constructor(DEBUG_MODE, groupService, router, pattern) {
        this.DEBUG_MODE = DEBUG_MODE;
        this.groupService = groupService;
        this.htmlUrl = "../../templates/group.html";
        this.page = "";
        this.parameters = null;
        this.router = router;
        this.pattern = pattern;
    }

    init() {
        this.parameters = this.router.getParameters();
        this.currentGroupId = this.parameters[1];
        this.groupService.setGroupId(this.currentGroupId);

        console.log(this.router.getParameters());
        this.postTemplate = document.getElementById("postTemplate").innerHTML;
        this.newPostContainer = document.getElementById('newPostContainer');
        this.commentTemplate = document.getElementById("commentTemplate").innerHTML;
        this.commentInputTemplate = document.getElementById("commentInputTemplate").innerHTML;
        this.newPostInput = document.getElementById("newPostInput");

        // const isGroupAdmin = JSON.parse(localStorage.adminGroups)
        //                         .filter(g => g == Router.getParameters()[2]);

        // if (isGroupAdmin.length != 0) {
        //     newPostContainer.classList.remove("w3-hide");
        // }

        this.commentInputTemplate = this.commentInputTemplate.replace("{{name}}", localStorage.name);
        this.commentInputTemplate = this.commentInputTemplate.replace("{{user_id}}", localStorage.id);

        this.groupService.getPosts(this.currentGroupId)
            .then(posts => {
                    for (let post of posts) {
                        const commentSection = "<ul class='w3-ul commentSection w3-card w3-round bg-white'>" + this.pattern.render(this.commentTemplate, post.comments) + this.commentInputTemplate + "</ul>";
                        // post.OP[0].timestamp = timestampToDate(post.OP[0].timestamp * 1000);
                        const opSection = this.pattern.render(this.postTemplate, post.OP);
                        $("#groupPosts").append("<li class='postWrapper bg-light-grey'>" + opSection + commentSection + "</li>");
                    }
                }
            );

        // this.groupService.subscribe(this, curGroupId);
    }

    getPage() {
        return this.page;
    }

    receiveGroupContent(content) {
        for (let post of content.posts) {
            const commentSection = "<ul class='w3-ul commentSection w3-card w3-round bg-white'>" + commentInputTemplate + "</ul>";
            const opSection = this.pattern.render(this.postTemplate, post.OP)
            $("#groupPosts").prepend("<li class='postWrapper bg-light-grey'>" + opSection + commentSection + "</li>")
        }
        for (let comment of content.comments) {
            $("#post" + comment.post_id).next().children().last().before(this.pattern.render(this.commentTemplate, [comment]));
        }
    }

    destroy() {
        this.groupService.unsubscribe(this);
    }
}