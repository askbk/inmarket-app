export class MessageListComponent {
    constructor(messageService, pattern) {
        this.messageService = messageService;
        this.htmlUrl = "../../templates/messages.html";
        this.page = "";
        this.pattern = pattern;
    }

    init() {
        this.inboxTemplate = document.getElementById("inboxTemplate").innerHTML;
        this.inbox = document.getElementById("inbox");
        this.messageService.getMessageList()
        .then(messageList => {
            this.inbox.innerHTML = this.pattern.render(this.inboxTemplate, messageList);
        });
    }

    getPage() {
        return this.page;
    }

    destroy() {
    }
}
