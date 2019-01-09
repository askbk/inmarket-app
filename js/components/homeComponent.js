export class HomeComponent {
    constructor(DEBUG_MODE) {
        this.DEBUG_MODE = DEBUG_MODE;
        this.htmlUrl = "../../templates/hjem.html";
        this.page = "";
    }

    init() {
        return true;
    }

    destroy() {

    }

    getPage() {
        return this.page;
    }
}
