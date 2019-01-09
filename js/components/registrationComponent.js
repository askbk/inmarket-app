export class RegistrationComponent {
    constructor(DEBUG_MODE, registrationService, pattern, router) {
        this.DEBUG_MODE = DEBUG_MODE;
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
        let userType = -1;

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
                    this.registrationService.setProperties({userType: 0});
                    userType = 0;
                    $("#pupilPage").removeClass("w3-hide");
                    break;
                case "student":
                    this.registrationService.setProperties({userType: 1});
                    userType = 1;
                    $("#studentPage").removeClass("w3-hide");
                    break;
                case "employee":
                    this.registrationService.setProperties({userType: 2});
                    userType = 2;
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
            let props = { kommuneNr: $("select").val() };
            if (userType === 0) {
                props.school = $("input[name='schoolPupil']").val();
                props.schoolYear = $("input[name='schoolYearPupil']").val();
                props.program = $("input[name='programPupil']").val();
            } else if (userType === 1) {
                props.school = $("input[name='schoolStudent']").val();
                props.schoolYear = $("input[name='schoolYearStudent']").val();
                props.program = $("input[name='programStudent']").val();
            } else if (userType === 2) {
                props.companyName = $("input[name='companyName']").val();
                props.position = $("input[name='position']").val();
                props.education = $("input[name='education']").val();
            }
            this.registrationService.setProperties(props);

            this.registrationService.register()
            .then(() => {
                this.router.navigate("innlogging");
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
