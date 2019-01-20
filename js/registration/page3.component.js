import { Component } from '../component.js';
import { template } from './page1.template.js';

export class RegPage3 extends Component {
    constructor(DEBUG_MODE, registrationService) {
        super(DEBUG_MODE, { //  templates
            undefined: false
        }, {    //  elements
            undefined: true,
            registration: "#registration"
        },
        undefined, template);
        this.registrationService = registrationService;
    }

    init() {
        super.initDOM();

        if (this.DEBUG_MODE) {
            console.log("RegPage3 init");
        }

        document.title = "Registrering | InMarket App";

        document.getElementById("registerButton").addEventListener("click", e => {
            e.preventDefault();
            let props = {};
            if (this.registrationService.user.userType === 0) {
                this.registrationService.setProperties({
                    school: $("input[name='school']").val(),
                    schoolYear: $("input[name='schoolYear']").val(),
                    program: $("input[name='program']").val()
                });
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
