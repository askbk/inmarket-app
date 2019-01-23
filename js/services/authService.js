import { Service } from '../service.js';

export class AuthService extends Service {
    constructor(DEBUG_MODE) {
        super(DEBUG_MODE);
    }

    login(credentials) {
        if (this.DEBUG_MODE) {
            console.log(credentials);
        }
        return fetch('php/users/login.php', {
            method: 'post',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: credentials
        }).then(response => {
            return response.json();
        }).then(token => {
            if (this.DEBUG_MODE) {
                console.log(token);
            }
            localStorage.jwt = token.jwt;
        }).catch(error => {
            if (this.DEBUG_MODE) {
                console.error(error.message);
            }
        });
    }

    logout() {
        localStorage.clear();
    }
}
