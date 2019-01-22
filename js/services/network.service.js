export class NetworkService {
    contstructor(DEBUG_MODE) {
        this.DEBUG_MODE = DEBUG_MODE;
    }

    getContacts() {
        return fetch("", {
            method: "post",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                "Authorization": "Bearer " + localStorage.jwt,
                'Content-Type': 'application/json'
            },
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
            headers: {
                'Accept': 'application/json, text/plain, */*',
                "Authorization": "Bearer " + localStorage.jwt,
                'Content-Type': 'application/json'
            },
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
            headers: {
                'Accept': 'application/json, text/plain, */*',
                "Authorization": "Bearer " + localStorage.jwt,
                'Content-Type': 'application/json'
            },
            body: {
                // TODO: skrive metode for å sende kontaktsforespørsler
            }
        }).then(response => {
            return response.json();
        });
    }

    acceptRequest(id) {
        return fetch("", {
            method: "post",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                "Authorization": "Bearer " + localStorage.jwt,
                'Content-Type': 'application/json'
            },
            body: {
                // TODO: skrive metode for å godta kontaktsforespørsler
            }
        }).then(response => {
            return response.json();
        });
    }
}
