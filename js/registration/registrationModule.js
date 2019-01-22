import { Module } from '../module.js';
import { Route } from '../router.js';
import { RegPage1 } from './page1.component.js';
import { RegPage2 } from './page2.component.js';
import { RegPage3 } from './page3.component.js';

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
            [
                new Route(/registrering\/1/, regPages[0]),
                new Route(/registrering\/2/, regPages[1]),
                new Route(/registrering\/3/, regPages[2]),
                new Route(/registrering\/?/, regPages[0])
            ]
        );
        this.registrationService = registrationService;
    }
}
