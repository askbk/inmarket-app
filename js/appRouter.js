import { Component } from './components/component.js';
import { Module } from './modules/module.js';
import { Router } from './router.js';

export class AppRouter extends Router {
    constructor(DEBUG_MODE, outlet) {
        super(DEBUG_MODE, outlet);
    }

    routingHandler(route) {
        if (route.body instanceof Module) {
            if (!route.body.routerActivated) {
                this.currentRoute.body.destroy();
                this.currentRoute = route;
                route.body.init();
            }
            return;
        }
        if (route.body.getPage() == "") {
            fetch(route.body.htmlUrl, {
                method: 'get'
            }).then(response => {
                return response.text();
            }).then(page => {
                route.body.page = page;
            }).then(() => {
                this.currentRoute.body.destroy();
                this.currentRoute = route;
                document.getElementById(this.outlet).innerHTML = route.body.getPage();
                route.body.init();
            });
        } else {
            this.currentRoute.body.destroy();
            this.currentRoute = route;
            document.getElementById(this.outlet).innerHTML = route.body.getPage();
            route.body.init();
        }
    }
};
