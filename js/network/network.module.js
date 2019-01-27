import { Module } from '../module.js';
import { Route } from '../router.js';
import { RequestsComponent } from './requests.component.js';

export class NetworkModule extends Module {
    constructor(DEBUG_MODE, appRouter, networkService, pattern) {
        const networkPages = [
            new RequestsComponent(
                DEBUG_MODE,
                networkService,
                appRouter,
                pattern
            )
        ];
        super(DEBUG_MODE, appRouter,
            [
                new Route(/nettverk\/?/, networkPages[0])
            ]
        );
        this.networkService = networkService;
    }
}
