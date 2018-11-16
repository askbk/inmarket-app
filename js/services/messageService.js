export class MessageService {
    constructor() {
        this.subscribers = [];
        this.active = false;
    }

    getMessageList() {
        return fetch("php/getMessages.php", {
            method: "post",
            headers: {
                "Authorization": "Bearer " + localStorage.jwt,
            },
            body: "includeDetails=1"
        }).then(response => {
            return response.json();
        }).then(messages => {
            return messages;
        });
    }

    subscribe(subscriber) {
        this.subscribers.push(subscriber);
        this.active = true;
    }

    unsubscribe(subscriber) {
        for (var i = 0; i < this.subscribers.length; i++) {
            if (this.subscribers[i] === subscriber) {
                this.subscribers.splice(i, 1);
                if (this.subscribers.length == 0) {
                    this.active = false;
                }
                return true;
            }
        }

        return false;
    }

    push() {

    }
}
