import { Component } from '../component.js';
import { template } from './page1.template.js';

export class RegPage1 extends Component{
    constructor(DEBUG_MODE, registrationService, pattern, router) {
        super(DEBUG_MODE, { //  templates
            undefined: false
        }, {    //  elements
            undefined: true,
            responseText: "#responseText"
        },
        undefined, template);
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
                    case "company":
                        this.registrationService.setProperties({userType: 3});
                        break;
                }
                location.hash = "/registrering/2";
            });
        });
    }

    destroy() {}
}
