export class ProfileComponent {
    constructor(DEBUG_MODE, pattern, appRouter, profileService) {
        this.DEBUG_MODE = DEBUG_MODE;
        this.htmlUrl = "../../templates/profile.html";
        this.page = "";
        this.pattern = pattern;
        this.appRouter = appRouter;
        this.profileService = profileService;
        this.profile = {};
    }

    init() {
        this.profileId = this.appRouter.getParameters(1)
        this.profileService.getProfile(this.profileId).then(profile => {
            this.profile = profile;
            console.log(this.profile);
        });
        return true;
    }

    destroy() {

    }

    getPage() {
        return this.page;
    }
}
