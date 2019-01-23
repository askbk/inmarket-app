export class Service {
    constructor(DEBUG_MODE) {
        this.DEBUG_MODE = DEBUG_MODE;
    }

    static stdHeaders() {
        return {
            "Accept": 'application/json, text/plain, */*',
            "Authorization": "Bearer " + localStorage.jwt,
            "Content-Type": 'application/json'
        };
    }
}
