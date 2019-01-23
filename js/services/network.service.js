import { Service } from '../service.js';

export class NetworkService extends Service {
    constructor(DEBUG_MODE) {
        super(DEBUG_MODE);
    }

    getContacts() {
        return fetch("php/users/getUser.php", {
            method: "post",
            headers: Service.stdHeaders(),
            body: JSON.stringify({contacts: 1})
        }).then(response => {
            return response.json();
        }).then(contacts => {
            console.log(contacts);
            this.contacts = contacts;
        });
    }

    getRequests() {
        return fetch("php/users/getUser.php", {
            method: "post",
            headers: Service.stdHeaders(),
            body: JSON.stringify({contactRequests: 1})
        }).then(response => {
            return response.json();
        }).then(requests => {
            this.requests = requests;
        });
    }

    sendRequest(id) {
        return fetch("php/users/contactUser.php", {
            method: "post",
            headers: Service.stdHeaders(),
            body: JSON.stringify({"receiver": id})
        });
    }

    acceptRequest(id) {
        return fetch("", {
            method: "post",
            headers: Service.stdHeaders(),
            body: {
                // TODO: skrive metode for å godta kontaktsforespørsler
            }
        }).then(response => {
            return response.json();
        });
    }
}
