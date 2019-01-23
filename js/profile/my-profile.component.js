import { Component } from '../component.js';
import { template } from './my-profile.template.js';

export class MyProfileComponent extends Component {
    constructor(DEBUG_MODE, profileService, pattern) {
        super(DEBUG_MODE, { //  templates
            undefined: true,
            fileList: "#myFileListTemplate"
        }, {    //  elements
            undefined: true,
            profilePicture: "#profilePicture",
            nameHeader: "#nameHeader",
            userTypeHeader: "#userTypeHeader",
            bio: "#bio",
            fileList: "#fileList",
            profilePage: "#profilePage"
        },
        undefined, template
        );

        this.pattern = pattern;
        this.profileService = profileService;
        this.profile = {};
    }

    init() {
        super.initDOM();

        this.profileService.getMyProfile().then(profile => {
            this.profile = profile[0];
        }).then(() => {
            if (this.DEBUG_MODE) {
                console.log(this.profile);
            }

            this.displayProfile();
        });

        document.getElementById("publicProfileLink").href = "#/profil/" + localStorage.myId;
        return true;
    }

    destroy() {

    }

    displayProfile() {
        this.elements.profilePicture.src = this.profile.profilePicture;
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
