export class RegistrationComponent {
    constructor(registrationService, pattern, router) {
        this.htmlUrl = "../../templates/register.html";
        this.page = "";
        this.pattern = pattern;
        this.registrationService = registrationService;
        this.router = router;
    }

    init() {
        this.registrationPages = document.getElementsByClassName("registrationPage");
        let pupilPage = document.getElementsByClassName("pupilPage");
        let studentPage = document.getElementsByClassName("studentPage");
        let employeePage = document.getElementsByClassName("employeePage");
        let kommuneTemplate = document.getElementById("kommuneTemplate").innerHTML;
        let kommuneList = document.getElementById("kommuneList");
        let responseText = document.getElementById("responseText");

        document.title = "Registrering | InMarket App";

        $('#registration').on('keyup keypress', e => {
            const keyCode = e.keyCode || e.which;
            if (keyCode === 13) {
                e.preventDefault();
                return false;
            }
        });

        $(document).on("click", ".clientType", e => {
            switch (e.currentTarget.value) {
                case "pupil":
                    this.registrationService.setProperties({isPupil: 1});
                    $("#pupilPage").removeClass("w3-hide");
                    break;
                case "student":
                    this.registrationService.setProperties({isStudent: 1});
                    $("#studentPage").removeClass("w3-hide");
                    break;
                case "employee":
                    this.registrationService.setProperties({isEmployee: 1});
                    $("#neetPage").removeClass("w3-hide");
                    break;
            }

            this.nextPage(1)
        });

        //  Input name, email, phone, password
        $(document).on("click", "#page2btn", () => {
            this.registrationService.setProperties(
                {
                    name: $("input[name='name']").val(),
                    email: $("input[name='email']").val(),
                    phone: $("input[name='phone']").val(),
                    password: $("input[name='password']").val()
                }
            );

            this.nextPage(2)
        });

        $(document).on("click", "#registerButton", e => {
            e.preventDefault();
            this.registrationService.setProperties(
                {
                    kommuneNr: $("select").val()
                }
            );

            this.registrationService.register()
            .then(() => {
                this.router.navigate("hjem");
            });
        });

        fetch("php/getKommuner.php")
        .then(response => {
            return response.json()
        })
        .then(kommuner => {
            kommuneList.innerHTML = this.pattern.render(kommuneTemplate, kommuner);
        });
    }

    nextPage(n) {
        for (let page of this.registrationPages) {
            page.classList.add("w3-hide");
        }

        this.registrationPages[n].classList.remove("w3-hide");
    }

    destroy() {

    }

    getPage() {
        return this.page;
    }
}
