export class MessageListComponent {
    constructor(DEBUG_MODE, messageService, pattern) {
        this.DEBUG_MODE = DEBUG_MODE;
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
