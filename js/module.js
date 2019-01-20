import { Router, Route } from './router.js';

export class Module {
    constructor(DEBUG_MODE, appRouter, router, routes) {
        this.DEBUG_MODE = DEBUG_MODE;
        this.appRouter = appRouter;
        this.router = router;
        this.router.registerRoutes(routes);
        this.routerActivated = false;
    }

    init() {
        if (!this.routerActivated) {
            if (this.DEBUG_MODE) {
                console.log("Activating router");
            }
            window.addEventListener("hashchange", this.hashChangeHandler.bind(this));
            this.router.route();
            this.routerActivated = true;
        }
    }

    destroy() {
        window.removeEventListener("hashchange", this.hashChangeHandler);
        this.routerActivated = false;
    }

    hashChangeHandler() {
        this.router.route();
    }
}
