import { Component } from '../component.js';
import { template } from './login.template.js';
import { Util } from '../utilities.js';

export class LoginComponent extends Component{
    constructor(DEBUG_MODE, authService, router) {
        super(DEBUG_MODE, {}, {}, undefined, template);
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
