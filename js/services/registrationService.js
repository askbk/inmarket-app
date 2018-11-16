export class RegistrationService {
    constructor() {
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
        Object.keys(props).forEach((property, index) => {
            console.log(property);
            this.user[property] = props[property];
        })
        console.log(this.user);
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
