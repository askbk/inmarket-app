import { Component } from './component.js';

export class RegistrationComponent extends Component {
    constructor(DEBUG_MODE, registrationService, pattern, router) {
        super(DEBUG_MODE, { //  templates
            undefined: true,
            kommune: "#kommuneTemplate",
        }, {    //  elements
            undefined: true,
            studentPage: "#studentPage",
            jobseekerPage: "#jobseekerPage",
            employeePage: "#employeePage",
            kommuneList: "#kommuneList",
            responseText: "#responseText",
            registrationPages: ".registrationPage",
            registration: "#registration"
        },
        "../../templates/register.html");
        this.pattern = pattern;
        this.registrationService = registrationService;
        this.router = router;
    }

    init() {
        super.initDOM();
        if (this.DEBUG_MODE) {
            console.log(this.elements);
            console.log("RegistrationComponent init");
        }
        let userType = -1;

        document.title = "Registrering | InMarket App";

        // const enterkeyHandling = e => {
        //     const keyCode = e.keyCode || e.which;
        //     console.log("Enter key pressed on registration page");
        //     if (keyCode === 13) {
        //         e.preventDefault();
        //         return false;
        //     }
        // };

        // this.registration.addEventListener("keyup", enterkeyHandling);
        // this.registration.addEventListener("keypress", enterkeyHandling);

        // $('#registration').on('keyup keypress', e => {
        //     const keyCode = e.keyCode || e.which;
        //     if (keyCode === 13) {
        //         e.preventDefault();
        //         return false;
        //     }
        // });

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
        for (let page of this.elements.registrationPages) {
            page.classList.add("w3-hide");
        }

        this.elements.registrationPages[n].classList.remove("w3-hide");

    }

    destroy() {

    }
}
