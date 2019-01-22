import { Component } from '../component.js';
import { template } from './page2.template.js';

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
        undefined, template);
        this.pattern = pattern;
        this.registrationService = registrationService;
    }

    init() {
        super.initDOM();

        if (this.DEBUG_MODE) {
            console.log("RegPage2 init");
        }

        if (this.registrationService.user.userType === 3) { // brukeren er en bedrift
            document.querySelector("input[name='name']").placeholder = "Bedriftsnavn";
        }

        // FIXME:
        //  Dette gir en race-condition.
        this.elements.kommuneList.innerHTML = this.pattern.render(this.templates.kommune, this.registrationService.getKommuner());

        //  Input name, email, phone, password
        document.getElementById("page2btn").addEventListener("click", () => {
            this.registrationService.setProperties(
                {
                    name: document.querySelector("input[name='name']").value,
                    email: document.querySelector("input[name='email']").value,
                    phone:document.querySelector("input[name='phone']").value,
                    password: document.querySelector("input[name='password']").value,
                    kommuneNr: document.querySelector("select").value
                }
            );

            location.hash = "/registrering/3";
        });
    }

    destroy() {}
}
