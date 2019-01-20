import { Component } from '../component.js';

export class LoginComponent extends Component{
    constructor(DEBUG_MODE, authService, router) {
        super(DEBUG_MODE, {}, {}, "../../templates/login.html");
        this.authService = authService;
        this.router = router;
    }

    init() {
        $(document).on("click", "input[name='loginBtn']", e => {
            e.preventDefault();
            this.authService.login($("#loginForm").serialize())
            .then(() => {
                this.router.navigate("hjem");
            });
        });
    }

    destroy() {

    }
}
