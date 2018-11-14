export class AuthService {
    constructor() {}

    login(credentials) {
        console.log(credentials);
        fetch('php/login.php', {
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
        });
    }

    logout() {
        localStorage.clear();
    }
}
