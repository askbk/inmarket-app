export class Util {
    constructor() {}

    static formSerialize(selector) {
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

    static objectSerialize(obj) {
        let result = "";

        for (let i = 0, keys = Object.keys(obj); i < keys.length; i++) {
            if (result.length > 0) {
                result += "&";
            }
            result += encodeURIComponent(keys[i]) + "=" + encodeURIComponent(obj[keys[i]]);
        }

        return result;
    }
}
