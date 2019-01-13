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
        if (this.DEBUG_MODE) {
            console.log("RegistrationComponent init");
        }
        this.registrationPages = document.getElementsByClassName("registrationPage");
        let studentPage = document.getElementById("studentPage");
        let jobseekerPage = document.getElementById("jobseekerPage");
        let employeePage = document.getElementById("employeePage");
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
            console.log("click clientType");
            switch (e.currentTarget.value) {
                case "student":
                    this.registrationService.setProperties({userType: 0});
                    userType = 0;
                    $("#studentPage").removeClass("w3-hide");
                    break;
                case "jobseeker":
                    this.registrationService.setProperties({userType: 1});
                    userType = 1;
                    $("#jobseekerPage").removeClass("w3-hide");
                    break;
                case "employee":
                    this.registrationService.setProperties({userType: 2});
                    userType = 2;
                    $("#employeePage").removeClass("w3-hide");
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
                //  Stuff for jobseeker
            } else if (userType === 2) {
                props.companyName = $("input[name='companyName']").val();
                props.position = $("input[name='position']").val();
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
