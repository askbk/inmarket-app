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

        if (this.elements.undefined) {
            for (let i = 0, keys = Object.keys(this.elements); i < keys.length; i++) {
                if (this.DEBUG_MODE) {
                    // console.log(keys[i]);
                }
                if (keys[i] == "undefined") {
                    continue;
                }
                if (this.elements[keys[i]][0] == "#") {
                    this.elements[keys[i]] = document.getElementById(this.elements[keys[i]]);
                } else {
                    this.elements[keys[i]] = document.querySelectorAll(this.elements[keys[i]]);
                }
            }

            this.elements.undefined = false;
        }

        if (this.templates.undefined) {
            for (var i = 0, keys = Object.keys(this.templates); i < keys.length; i++) {
                if (this.DEBUG_MODE) {
                    // console.log(keys[i]);
                }
                if (keys[i] == "undefined") {
                    continue;
                }
                this.templates[keys[i]] = document.querySelector(this.templates[keys[i]]).innerHTML;
            }

            this.templates.undefined = false;
        }

        if (this.DEBUG_MODE) {
            console.log("Component finished initializing DOM");
        }
    }

    getPage() {
        return this.page;
    }
}
