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
        window.onhashchange = () => {
            this.router.route();
        }
    }
}
