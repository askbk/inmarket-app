export class Forms {
    constructor() {}

    static serialize(selector) {
        let result = "";
        const elements = document.querySelector(selector).childNodes;

        for (var i = 0; i < elements.length; i++) {
            if (elements[i].tagName === "INPUT") {
                if (result.length > 0) {
                    result += "&";
                }
                result += encodeURIComponent(elements[i].name) + "=" + encodeURIComponent(elements[i].value);
            }
        }

        return result;
    }
}
