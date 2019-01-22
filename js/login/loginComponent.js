import { Component } from '../component.js';
import { Forms } from '../forms.js';

export class LoginComponent extends Component{
    constructor(DEBUG_MODE, authService, router) {
        super(DEBUG_MODE, {}, {}, "../../templates/login.html");
        this.authService = authService;
        this.router = router;
    }

    init() {
        document.querySelector("button[name='loginBtn']").addEventListener("click", e => {
            e.preventDefault();
            this.authService.login(Forms.serialize("#loginForm"))
            .then(() => {
                this.router.navigate("hjem");
            });
        })
    }

    destroy() {

    }
}
