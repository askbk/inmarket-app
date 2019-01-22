import { Component } from '../component.js';
import { template } from './profile.template.js';

export class ProfileComponent extends Component {
    constructor(DEBUG_MODE, profileService, appRouter, pattern) {
        super(DEBUG_MODE, { //  templates
            undefined: true,
            fileList: "#fileListTemplate"
        }, {    //  elements
            undefined: true,
            profilePicture: "#profilePicture",
            nameHeader: "#nameHeader",
            userTypeHeader: "#userTypeHeader",
            bio: "#bio",
            fileList: "#fileList",
            profilePage: "#profilePage",
            kontaktBtn: "button[name='contact']"
        },
        undefined, template
        );

        this.pattern = pattern;
        this.appRouter = appRouter;
        this.profileService = profileService;
        this.profile = {};
    }

    init() {
        super.initDOM();

        this.profileService.getProfile(this.appRouter.getParameters(1)).then(profile => {
            this.profile = profile[0];
            if (this.DEBUG_MODE) {
                console.log(this.profile);
            }

            this.displayProfile();
        });

        this.elements.kontaktBtn[0].addEventListener("click", () => {
            fetch('php/users/contactUser.php', {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    "Authorization": "Bearer " + localStorage.jwt,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"receiver": this.appRouter.getParameters(1)})
            }).then(() => {
                this.elements.kontaktBtn[0].disabled = true;
                this.elements.kontaktBtn[0].innerHTML = "Forespørsel sendt";
            });
        });

        return true;
    }

    destroy() {

    }

    displayProfile() {
        // this.profileElements.profilePic.src = this.profile.profilePicture;
        this.elements.nameHeader.innerHTML = this.profile.name;
        document.title = this.profile.name;

        switch (this.profile.userType) {
            case 0:
                this.elements.userTypeHeader.innerHTML = "Elev";
                break;
            case 1:
                this.elements.userTypeHeader.innerHTML = "Student";
                break;
            default:
            break;
        }

        this.elements.bio.innerHTML = this.profile.biography;

        this.elements.profilePage.classList.remove("w3-hide");
    }
}
