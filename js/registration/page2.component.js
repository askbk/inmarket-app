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

        this.elements.kommuneList.innerHTML = this.pattern.render(this.templates.kommune, this.registrationService.getKommuner());

        //  Input name, email, phone, password
        document.getElementById("page2btn").addEventListener("click", () => {
            this.registrationService.setProperties(
                {
                    name: $("input[name='name']").val(),
                    email: $("input[name='email']").val(),
                    phone: $("input[name='phone']").val(),
                    password: $("input[name='password']").val(),
                    kommuneNr: $("select").val()
                }
            );

            location.hash = "/registrering/3";
        });
    }

    destroy() {}
}
