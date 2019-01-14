export class ProfileComponent {
    constructor(DEBUG_MODE, pattern, appRouter, profileService) {
        this.DEBUG_MODE = DEBUG_MODE;
        this.htmlUrl = "../../templates/profile.html";
        this.page = "";
        this.pattern = pattern;
        this.appRouter = appRouter;
        this.profileService = profileService;
        this.profile = {};
        this.profileElements = {
            undefined: true,
            profilePicture: undefined,
            nameHeader: undefined,
            userTypeHeader: undefined,
            bio: undefined,
            fileList: undefined,
            profilePage: undefined
        };
        this.templates = {
            undefined: true,
            fileList: undefined
        };
    }

    init() {
        if (this.profileElements.undefined) {
            Object.keys(this.profileElements).forEach((key, index) => {
                if (!this.profileElements[key]) {
                    this.profileElements[key] = document.getElementById(key);
                }
            });

            this.profileElements.undefined = false;
        }

        if (this.templates.undefined) {
            Object.keys(this.templates).forEach((key, index) => {
                if (!this.templates[key]) {
                    this.templates[key] = document.getElementById(key).innerHTML;
                }
            });

            this.templates.undefined = false;
        }

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
