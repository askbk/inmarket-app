import { Component } from '../component.js';
import { Util } from '../utilities.js';

export class LoginComponent extends Component{
    constructor(DEBUG_MODE, authService, router) {
        super(DEBUG_MODE, {}, {}, "../../templates/login.html");
        this.authService = authService;
        this.router = router;
    }

    init() {
        document.querySelector("button[name='loginBtn']").addEventListener("click", e => {
            e.preventDefault();
            this.authService.login(Util.formSerialize("#loginForm"))
            .then(() => {
                this.router.navigate("hjem");
            });
        })
    }

    destroy() {

    }
}
