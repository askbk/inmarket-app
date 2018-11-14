export class LoginComponent {
    constructor(authService, router) {
        this.authService = authService;
        this.htmlUrl = "../../templates/login.html";
        this.page = "";
        this.router = router;
    }

    init() {
        console.log("login initiated");
        $(document).on("click", "input[name='loginBtn']", e => {
            e.preventDefault();
            this.authService.login($("#loginForm").serialize())
            .then(() => {
                this.router.navigate("/hjem");
            });
        });
    }

    destroy() {
        
    }

    getPage() {
        return this.page;
    }
}
