export class Service {
    constructor(DEBUG_MODE) {
        this.stdHeaders =  {
            'Accept': 'application/json, text/plain, */*',
            "Authorization": "Bearer " + localStorage.jwt,
            'Content-Type': 'application/json'
        };

        this.DEBUG_MODE = DEBUG_MODE;
    }
}
