import { Component } from './component.js';
import { Module } from './module.js';

export class Router {
    constructor(DEBUG_MODE, outlet, errorComponent) {
        this.DEBUG_MODE = DEBUG_MODE;
        this.outlet = outlet;
        this.routes = [];
        this.parameters = [];
        this.currentRoute = new Route("", new Component());
        this.errorRoute = new Route("", errorComponent);
    }

    registerRoutes(routes) {
        for (let route of routes) {
            this.routes.push(route)
        }
    }

    route() {
        let path = window.location.hash.substring(1);

        if (path[0] == "/") {
            path = path.substring(1);
        }

        for (let route of this.routes) {
            if (route.re.test(path)) {
                if (this.DEBUG_MODE) {
                    // console.log("routing to:" + route.re);
                }

                this.parameters = path.match(route.re)[0].split("/");

                this.routingHandler(route)

                return;
            }
        }

        this.routingHandler(this.errorRoute);
    }

    routingHandler(route) {
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

    getParameters(n = -1) {
        if (n === -1) {
            return this.parameters;
        }

        return this.parameters[n];
    }

    navigate(path) {
        window.location.hash = "#/" + path;
    }
};

export class Route {
    constructor(re, body) {
        this.re = re;
        this.body = body;
    }
}
