export class AppRouter {
    constructor(outlet) {
        this.outlet = outlet;
        this.routes = [];
        this.parameters = [];
    }

    registerRoutes(routes) {
        for (let route of routes) {
            this.routes.push(route)
        }
    }

    route() {
        let path = window.location.hash.substring(1)
        for (let route of this.routes) {
            if (route.re.test(path)) {
                this.parameters = path.match(route.re)[0].split("/");
                document.getElementById(this.outlet).innerHTML = route.component.getPage();
                route.component.init();
                break;
            }
        }
    }

    getParameters() {
        return this.parameters;
    }
};

export class Route {
    constructor(re, component) {
        this.re = re;
        this.component = component;
    }
}
