import { Module } from './module.js';
import { Router, Route } from '../appRouter.js';

export class RegistrationModule extends Module {
    constructor(DEBUG_MODE, appRouter) {
        super(DEBUG_MODE. appRouter,
            new Router(DEBUG_MODE, "content"),
            [
                new Route(/registrering\/*1*/, regPage1),
                new Route(/registrering\/2/, regPage2),
                new Route(/registrering\/3/, regPage3)
            ]
        )
    }
}
