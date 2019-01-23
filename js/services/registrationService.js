import { Service } from '../service.js';
import { Util } from '../utilities.js';

export class RegistrationService extends Service {
    constructor(DEBUG_MODE) {
        super(DEBUG_MODE);
        this.user = {
            name            : "",
            email           : "",
            phone           : "",
            password        : "",
            kommuneNr       : 0,
            userType        : -1,
            emailVerified   : 0
        };
        this.kommuner = "";
    }

    start() {
        return fetch("php/getKommuner.php")
        .then(response => {
            return response.json();
        }).then(kommuner => {
            this.kommuner = kommuner;
            return kommuner;
        });
    }

    getKommuner() {
        return this.kommuner;
    }

    register() {
        if (this.DEBUG_MODE) {
            console.log(this.user);
        }
        return fetch("php/users/register.php", {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: Util.objectSerialize(this.user)
        })
        .then(() => {
            this.reset();
        });
    }

    setProperties(props) {
        for (let i = 0, keys = Object.keys(props); i < keys.length; i++) {
            this.user[keys[i]] = props[keys[i]];
        }
        if (this.DEBUG_MODE) {
            console.log("set props:");
            console.log(props);
        }
    }

    reset() {
        this.user = {
            name            : "",
            email           : "",
            phone           : "",
            password        : "",
            kommuneNr       : 0,
            userType        : -1,
            emailVerified   : 0
        };
    }
}
