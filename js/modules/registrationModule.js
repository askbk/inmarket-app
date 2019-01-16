import { Module } from './module.js';
import { Router, Route } from '../appRouter.js';
import { RegPage1, RegPage2, RegPage3 } from '../components/registrationComponent.js';

export class RegistrationModule extends Module {
    constructor(DEBUG_MODE, appRouter, registrationService, pattern) {
        const regPages = [
            new RegPage1(
                DEBUG_MODE,
                registrationService
            ),
            new RegPage2(
                DEBUG_MODE,
                registrationService,
                pattern
            ),
            new RegPage3(
                DEBUG_MODE,
                registrationService
            )
        ];
        super(DEBUG_MODE, appRouter,
            new Router(DEBUG_MODE, "content"),
            [
                new Route(/registrering\/1/, regPages[0]),
                new Route(/registrering\/2/, regPages[1]),
                new Route(/registrering\/3/, regPages[2]),
                new Route(/registrering/, regPages[0])
            ]
        );
        this.registrationService = registrationService;
    }
}
