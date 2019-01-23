import { Service } from '../service.js';

export class NetworkService extends Service {
    constructor(DEBUG_MODE) {
        super(DEBUG_MODE);
    }

    getContacts() {
        return fetch("", {
            method: "post",
            headers: this.stdHeaders,
            body: {
                // TODO: skrive metode for å hente kontakter
            }
        }).then(response => {
            return response.json();
        }).then(contacts => {
            this.contacts = contacts;
        });
    }

    getRequests() {
        return fetch("", {
            method: "post",
            headers: this.stdHeaders,
            body: {
                // TODO: skrive metode for å hente kontaktsforespørsler
            }
        }).then(response => {
            return response.json();
        }).then(requests => {
            this.requests = requests;
        });
    }

    sendRequest(id) {
        return fetch("", {
            method: "post",
            headers: this.stdHeaders,
            body: JSON.stringify({"receiver": id})
        }).then(response => {
            return response.json();
        });
    }

    acceptRequest(id) {
        return fetch("", {
            method: "post",
            headers: this.stdHeaders,
            body: {
                // TODO: skrive metode for å godta kontaktsforespørsler
            }
        }).then(response => {
            return response.json();
        });
    }
}
