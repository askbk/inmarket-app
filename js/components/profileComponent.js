import { Component } from './component.js';

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
            profilePage: "#profilePage"
        },
        "../../templates/profile.html"
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
