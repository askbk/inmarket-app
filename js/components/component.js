export class Component {
    constructor(DEBUG_MODE, templates, elements, htmlUrl) {
        this.DEBUG_MODE = DEBUG_MODE;
        this.htmlUrl = htmlUrl;
        this.page = "";
        this.templates = templates;
        this.elements = elements;
    }

    initDOM() {
        if (this.DEBUG_MODE) {
            console.log("Component initializing DOM");
        }
        if (this.profileElements.undefined) {
            Object.keys(this.profileElements).forEach((key, index) => {
                if (!this.profileElements[key]) {
                    this.profileElements[key] = document.querySelector(this.profileElements[key]);
                }
            });

            this.profileElements.undefined = false;
        }

        if (this.templates.undefined) {
            Object.keys(this.templates).forEach((key, index) => {
                if (!this.templates[key]) {
                    this.templates[key] = document.querySelector(key).innerHTML;
                }
            });

            this.templates.undefined = false;
        }
    }

    getPage() {
        return this.page;
    }
}
