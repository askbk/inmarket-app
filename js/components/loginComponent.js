export class LoginComponent {
    constructor(authService) {
        this.authService = authService;
        this.htmlUrl = "../../templates/login.html";
        this.page = "";
    }

    init() {
        console.log("login initiated");
        $(document).on("click", "input[name='loginBtn']", e => {
            e.preventDefault();
            this.authService.login($("#loginForm").serialize());
        });
    }

    getPage() {
        return this.page;
    }
}
