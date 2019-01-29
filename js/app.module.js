import { Module } from './module.js';
import { Route } from './router.js';

import { LoginComponent } from './login/loginComponent.js';
import { HomeComponent } from './home/homeComponent.js';

export class AppModule extends Module {
    constructor(DEBUG_MODE, appRouter, authService) {
        const homeComponent = new HomeComponent(DEBUG_MODE),
            loginComponent = new LoginComponent(DEBUG_MODE, authService, appRouter);
            
        super(DEBUG_MODE, appRouter,
            [
                new Route(/innlogging\/?/, loginComponent),
                new Route(/hjem\/?/, homeComponent),
                new Route(/^(?![\s\S])/, homeComponent)
            ]
        );
    }
}
