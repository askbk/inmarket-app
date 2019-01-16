import { Router, Route } from '../appRouter.js';

export class Module {
    constructor(DEBUG_MODE, appRouter, router, routes) {
        this.DEBUG_MODE = DEBUG_MODE;
        this.appRouter = appRouter;
        this.router = router;
        this.router.registerRoutes(routes);
    }

    init() {
        this.router.route();
        window.addEventListener("hashchange", this.hashChangeHandler.bind(this));
    }

    destroy() {
        window.removeEventListener("hashchange", this.hashChangeHandler);
    }

    hashChangeHandler() {
        this.router.route();
    }
}
