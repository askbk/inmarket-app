export class ErrorComponent {
    constructor(DEBUG_MODE) {
        this.DEBUG_MODE = DEBUG_MODE;
        this.htmlUrl = "../../templates/error.html";
        this.page = "";
    }

    init() {
        return false;
    }

    destroy() {

    }

    getPage() {
        return this.page;
    }
}
