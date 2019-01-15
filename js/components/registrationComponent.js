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

        fetch("php/getKommuner.php")
        .then(response => {
            return response.json();
        }).then(kommuner => {
            this.elements.kommuneList.innerHTML = this.pattern.render(this.templates.kommune, kommuner);
        })

        let userType = -1;

        document.title = "Registrering | InMarket App";

        document.querySelectorAll(".clientType").forEach(e => {
            e.addEventListener("click", e => {
                console.log(this);
                switch (e.currentTarget.value) {
                    case "student":
                        this.registrationService.setProperties({userType: 0});
                        userType = 0;
                        this.elements.studentPage.classList.remove("w3-hide");
                        break;
                    case "jobseeker":
                        this.registrationService.setProperties({userType: 1});
                        userType = 1;
                        this.elements.jobseekerPage.classList.remove("w3-hide");
                        break;
                    case "employee":
                        this.registrationService.setProperties({userType: 2});
                        userType = 2;
                        this.elements.employeePage.classList.remove("w3-hide");
                        break;
                }

                this.nextPage(1)
            });
        });

        //  Input name, email, phone, password
        document.getElementById("page2btn").addEventListener("click", () => {
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

        document.getElementById("registerButton").addEventListener("click", e => {
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
    }

    nextPage(n) {
        for (let page of this.elements.registrationPages) {
            page.classList.add("w3-hide");
        }

        this.elements.registrationPages[n].classList.remove("w3-hide");
    }

    destroy() {}
}
