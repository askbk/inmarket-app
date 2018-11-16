export class RegistrationService {
    constructor() {
        this.user = {
            name            : "",
            email           : "",
            phone           : "",
            password        : "",
            kommuneNr       : 0,
            isPupil         : 0,
            isStudent       : 0,
            isNEET          : 0,
            emailVerified   : 0
        };
    }

    register() {
        console.log(this.user);
        return fetch("php/register.php", {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.user)
        });
    }

    setProperties(props) {
        Object.keys(props).forEach((property, index) => {
            console.log(property);
            this.user.property = props.property;
        })
    }

    setPupil() {
        this.clearType();
        this.user.isPupil = 0;
    }

    reset() {
        this.user = {
            name            : "",
            email           : "",
            phone           : "",
            password        : "",
            kommuneNr       : 0,
            isPupil         : 0,
            isStudent       : 0,
            isNEET          : 0,
            emailVerified   : 0
        };
    }
}
