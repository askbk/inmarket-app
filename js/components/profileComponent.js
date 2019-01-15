import { Component } from './component.js';

export class ProfileComponent extends Component{
    constructor(DEBUG_MODE, pattern, appRouter, profileService) {
        super(DEBUG_MODE, { //  templates
            undefined: true,
            fileList: "#fileList"
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

        // this.htmlUrl = "../../templates/profile.html";
        this.pattern = pattern;
        this.appRouter = appRouter;
        this.profileService = profileService;
        this.profile = {};
    }

    init() {
        super.initDOM();

        this.profileId = this.appRouter.getParameters(1)

        this.profileService.getProfile(this.profileId).then(profile => {
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
        this.profileElements.nameHeader.innerHTML = this.profile.name;
        document.title = this.profile.name;

        switch (this.profile.userType) {
            case 0:
                this.profileElements.userTypeHeader.innerHTML = "Elev";
                break;
            case 1:
                this.profileElements.userTypeHeader.innerHTML = "Student";
                break;
            default:
            break;
        }

        this.profileElements.bio.innerHTML = this.profile.biography;

        this.profileElements.profilePage.classList.remove("w3-hide");
    }

    getPage() {
        return this.page;
    }
}
