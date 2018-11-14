export class ErrorComponent {
    constructor() {
        this.htmlUrl = "../../templates/error.html";
        this.page = "";
    }

    init() {
        return false;
    }
    
    getPage() {
        return this.page;
    }
}
