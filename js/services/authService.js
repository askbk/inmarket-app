export class AuthService {
    constructor(DEBUG_MODE) {
        this.DEBUG_MODE = DEBUG_MODE;
    }

    login(credentials) {
        console.log(credentials);
        return fetch('php/login.php', {
            method: 'post',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: credentials
        }).then(response => {
            return response.json();
        }).then(token => {
            console.log(token);
            localStorage.jwt = token.jwt;
        }).catch(error => {
            console.log(error.message);
        });
    }

    logout() {
        localStorage.clear();
    }
}
