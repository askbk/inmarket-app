export class ProfileComponent {
    constructor(DEBUG_MODE, pattern, appRouter, profileService) {
        this.DEBUG_MODE = DEBUG_MODE;
        this.htmlUrl = "../../templates/profile.html";
        this.page = "";
        this.pattern = pattern;
        this.appRouter = appRouter;
        this.profileService = profileService;
    }

    init() {
        this.profileService.getProfile(1).then(profile => {
            console.log(profile);
        });
        return true;
    }

    destroy() {

    }

    getPage() {
        return this.page;
    }
}
