export class Util {
    constructor() {}

    static formSerialize(selector) {
        let result = "";
        const elements = document.querySelector(selector).childNodes;

        for (let i = 0, l = elements.length; i < l; i++) {
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

        for (let i = 0, keys = Object.keys(obj), l = keys.length; i < l; i++) {
            if (result.length > 0) {
                result += "&";
            }
            result += encodeURIComponent(keys[i]) + "=" + encodeURIComponent(obj[keys[i]]);
        }

        return result;
    }
}
