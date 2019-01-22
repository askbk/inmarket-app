import { Router, Route } from './router.js';

export class Module {
    constructor(DEBUG_MODE, appRouter, routes) {
        this.DEBUG_MODE = DEBUG_MODE;
        this.appRouter = appRouter;
        this.appRouter.registerRoutes(routes);
    }
}
