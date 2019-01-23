import { Module } from '../module.js';
import { Route } from '../router.js';

export class NetworkModule extends Module {
    constructor(DEBUG_MODE, appRouter, networkService, pattern) {
        super(DEBUG_MODE, appRouter,
            []
        );
        this.networkService = networkService;
    }
}
