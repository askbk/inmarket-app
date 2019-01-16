export class Component {
    constructor(DEBUG_MODE, tempSelectors, elSelectors, htmlUrl, page = undefined) {
        this.DEBUG_MODE = DEBUG_MODE;
        this.htmlUrl = htmlUrl;
        this.page = page || "";
        this.elSelectors = elSelectors;
        this.tempSelectors = tempSelectors;
        this.templates = {undefined: true};
        this.elements = {undefined: true};
    }

    initDOM() {
        if (this.DEBUG_MODE) {
            console.log("Component initializing DOM");
        }

        if (this.elements.undefined) {
            for (let i = 0, keys = Object.keys(this.elSelectors); i < keys.length; i++) {
                if (this.DEBUG_MODE) {
                    // console.log(this.elements[keys[i]]);
                }
                if (keys[i] == "undefined") {
                    continue;
                }
                if (this.elSelectors[keys[i]][0] == "#") {
                    this.elements[keys[i]] = document.querySelector(this.elSelectors[keys[i]]);
                } else {
                    this.elements[keys[i]] = document.querySelectorAll(this.elSelectors[keys[i]]);
                }
            }

            // this.elements.undefined = false;
        }

        if (this.tempSelectors.undefined) {
            for (let i = 0, keys = Object.keys(this.tempSelectors); i < keys.length; i++) {
                if (this.DEBUG_MODE) {
                    // console.log(keys[i]);
                }
                if (keys[i] == "undefined") {
                    continue;
                }
                this.templates[keys[i]] = document.querySelector(this.tempSelectors[keys[i]]).innerHTML;
            }

            // this.templates.undefined = false;
        }

        if (this.DEBUG_MODE) {
            console.log(this.elements);
            console.log(this.templates);
            console.log("Component finished initializing DOM");
        }
    }

    getPage() {
        return this.page;
    }

    destroy() {}
}
