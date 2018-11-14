export class HomeComponent {
    constructor() {
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
