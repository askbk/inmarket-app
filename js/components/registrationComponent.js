import { Component } from './component.js';

const regPage1html = `
<meta charset="utf-8">
<div class="w3-container w3-content w3-padding-32 w3-large">
    <div id="registration" class="w3-panel">
        <button class="black-button w3-card w3-mobile clientType w3-input hover-bg-grey" value="student">Elev/student</button>
        <button class="black-button w3-card w3-mobile clientType w3-input hover-bg-grey w3-section" value="jobseeker">Jobbsøker</button>
        <button class="black-button w3-card w3-mobile clientType w3-input hover-bg-grey" value="employee">Bedriftsansatt</button>

        <p>Allerede registrert? <a href="#/innlogging" class="text-underline">Logg inn her.</a> </p>
    </div>

    <p id="responseText"></p>
</div>
`,
    regPage2html = `
    <meta charset="utf-8">
    <div class="w3-container w3-content w3-padding-32 w3-large">
        <div id="registration" class="w3-panel">
        <input class="w3-input" type="text" name="name" value="" placeholder="navn" required pattern="^([ \u00c0-\u01ffa-zA-Z'\-])+$">
        <input class="w3-input w3-section" type="email" name="email" value="" placeholder="epost" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$">
        <input class="w3-input" type="text" name="phone" value="" placeholder="telefon" required pattern="[0-9]{8}">
        <input class="w3-input w3-section" type="password" name="password" value="" placeholder="passord" required pattern=".{8,}">

        <label class="">
        Hjemkommune:
        <select class=" w3-input" name="" placeholder="hjemkommune"  id="kommuneList">

        </select>
        </label>
        <button class="black-button w3-card w3-mobile w3-input hover-bg-grey" type="button" name="button" id="page2btn">Neste</button>
        </div>

        <p id="responseText"></p>
    </div>

    <template id="kommuneTemplate">
        <option value="{{kommuneNr}}">{{kommuneNavn}}</option>
    </template>
    `,
    regPage3html = `
    <meta charset="utf-8">
    <div class="w3-container w3-content w3-padding-32 w3-large">
        <div id="registration"class="w3-panel">
            <div class="" id="studentPage">
            <input class="w3-input w3-section" type="text" name="school" value="" placeholder="Skole" pattern="^([ \u00c0-\u01ffa-zA-Z0-9'\-])+$">
            <input class="w3-input" type="text" name="program" value="" placeholder="Retning" pattern="^([ \u00c0-\u01ffa-zA-Z'\-])+$">
            <input class="w3-input w3-section" type="text" name="schoolYear" value="" placeholder="Årstrinn" pattern="^([ \u00c0-\u01ffa-zA-Z0-9'\-])+$">
            </div>

            <div class="w3-hide" id="jobseekerPage">
            <input class="w3-input w3-section" type="text" name="schoolStudent" value="" placeholder="Universitet/høyskole" pattern="^([ \u00c0-\u01ffa-zA-Z0-9'\-])+$">
            <input class="w3-input" type="text" name="programStudent" value="" placeholder="linje" pattern="^([ \u00c0-\u01ffa-zA-Z'\-])+$">
            <input class="w3-input w3-section" type="text" name="schoolYearStudent" value="" placeholder="årstrinn" pattern="^([ \u00c0-\u01ffa-zA-Z0-9'\-])+$">
            </div>

            <div class="w3-hide" id="employeePage">
            <input class="w3-input w3-section" type="text" name="companyName" value="" placeholder="Bedriftsnavn" pattern="^([ \u00c0-\u01ffa-zA-Z0-9'\-])+$">
            <input class="w3-input" type="text" name="companyNo" value="" placeholder="Organisasjonsnummer">
            <input class="w3-input w3-section" type="text" name="position" value="" placeholder="Stilling" pattern="^([ \u00c0-\u01ffa-zA-Z'\-])+$">
            </div>

            <input type="submit" name="" value="Ferdig" class="black-button w3-card w3-mobile clientType w3-input hover-bg-grey" id="registerButton">
        </div>

        <p id="responseText"></p>
    </div>
    `

export class RegPage1 extends Component{
    constructor(DEBUG_MODE, registrationService, pattern, router) {
        super(DEBUG_MODE, { //  templates
            undefined: false
        }, {    //  elements
            undefined: true,
            responseText: "#responseText"
        },
        undefined, regPage1html);
        this.pattern = pattern;
        this.registrationService = registrationService;
        this.router = router;
    }

    init() {
        super.initDOM();

        if (this.DEBUG_MODE) {
            console.log(this.elements);
            console.log("RegPage1 init");
        }

        let userType = -1;

        document.title = "Registrering | InMarket App";

        document.querySelectorAll(".clientType").forEach(e => {
            e.addEventListener("click", e => {
                console.log(this);
                switch (e.currentTarget.value) {
                    case "student":
                        this.registrationService.setProperties({userType: 0});
                        break;
                    case "jobseeker":
                        this.registrationService.setProperties({userType: 1});
                        break;
                    case "employee":
                        this.registrationService.setProperties({userType: 2});
                        break;
                }
                location.hash = "/registrering/2";
            });
        });
    }

    destroy() {}
}

export class RegPage2 extends Component {
    constructor(DEBUG_MODE, registrationService, pattern) {
        super(DEBUG_MODE, { //  templates
            undefined: true,
            kommune: "#kommuneTemplate",
        }, {    //  elements
            undefined: true,
            kommuneList: "#kommuneList",
            responseText: "#responseText"
        },
        undefined, regPage2html);
        this.pattern = pattern;
        this.registrationService = registrationService;
    }

    init() {
        super.initDOM();

        if (this.DEBUG_MODE) {
            console.log("RegPage2 init");
        }

        this.elements.kommuneList.innerHTML = this.pattern.render(this.templates.kommune, this.registrationService.getKommuner());

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

            location.hash = "/registrering/3";
        });
    }

    destroy() {}
}

export class RegPage3 extends Component {
    constructor(DEBUG_MODE, registrationService) {
        super(DEBUG_MODE, { //  templates
            undefined: false
        }, {    //  elements
            undefined: true,
            registration: "#registration"
        },
        undefined, regPage3html);
        this.registrationService = registrationService;
    }

    init() {
        super.initDOM();

        if (this.DEBUG_MODE) {
            console.log(this.elements);
            console.log("RegPage2 init");
        }

        document.title = "Registrering | InMarket App";

        document.getElementById("registerButton").addEventListener("click", e => {
            e.preventDefault();
            let props = { kommuneNr: $("select").val() };
            if (this.registrationService.user.userType === 0) {
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
                location.hash = "/innlogging";
            });
        });
    }

    destroy() {}
}
