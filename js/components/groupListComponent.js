export class GroupListComponent {
    constructor(groupService, pattern) {
        this.groupService = groupService;
        this.htmlUrl = "../../templates/groups.html";
        this.page = "";
        this.pattern = pattern;
    }

    init() {
        this.groupListTemplate = document.getElementById("groupListTemplate").innerHTML;
        this.groupListContainer = document.getElementById("groupList");
        this.groupService.getGroupList()
        .then(groupList => {
            this.groupListContainer.innerHTML = this.pattern.render(this.groupListTemplate, groupList);
        });
    }

    getPage() {
        return this.page;
    }

    destroy() {
    }
}
