export class GroupComponent {
    constructor(groupService) {
        this.groupService = groupService;
        this.htmlUrl = "../../templates/group.html";
        this.page = "";
    }

    init(curGroupId) {
        let postTemplate = $("#postTemplate").html(),
            newPostContainer = document.getElementById('newPostContainer'),
            commentTemplate = document.getElementById("commentTemplate").innerHTML,
            commentInputTemplate = document.getElementById("commentInputTemplate").innerHTML,
            newPostInput = document.getElementById("newPostInput");

        $("#currentPageHeader").text("Gruppe");

        const isGroupAdmin = JSON.parse(localStorage.adminGroups)
                                .filter(g => g == Router.getParameters()[2]);

        if (isGroupAdmin.length != 0) {
            newPostContainer.classList.remove("w3-hide");
        }

        commentInputTemplate = commentInputTemplate.replace("{{name}}", localStorage.name);
        commentInputTemplate = commentInputTemplate.replace("{{user_id}}", localStorage.id);

        this.groupService.getPosts(curGroupId)
            .then(
                result => {
                    GroupController.printPosts(result);
                }
            );

        this.groupService.subscribe(this, curGroupId);
    }

    getPage() {
        return this.page;
    }

    receiveGroupContent(content) {
        GroupController.printNewPosts(content.posts);
        GroupController.printNewComments(content.comments);
    }

    destroy() {
        this.groupService.unsubscribe(this);
    }
}
