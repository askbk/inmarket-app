export class RegistrationService {
    constructor(DEBUG_MODE) {
        this.DEBUG_MODE = DEBUG_MODE;
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
        });
    }

    getKommuner() {
        return this.kommuner;
    }

    register() {
        console.log(this.user);
        return fetch("php/register.php", {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: $.param(this.user)
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
            console.log(this.user);
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
