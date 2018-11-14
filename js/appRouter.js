export class AppRouter {
    constructor(outlet) {
        this.outlet = outlet;
        this.routes = [];
        this.parameters = [];
        this.currentRoute = {component: {destroy() {return true}}};
    }

    registerRoutes(routes) {
        for (let route of routes) {
            this.routes.push(route)
        }
    }

    route() {
        let path = window.location.hash.substring(1)

        if (path[0] == "/") {
            path = path.substring(1);
        }

        for (let route of this.routes) {
            if (route.re.test(path)) {
                this.parameters = path.match(route.re)[0].split("/");
                this.currentRoute.component.destroy();
                this.currentRoute = route;
                document.getElementById(this.outlet).innerHTML = route.component.getPage();
                route.component.init();
                break;
            }
        }
    }

    getParameters() {
        return this.parameters;
    }

    navigate(path) {
        window.location.hash = "#/" + path;
    }
};

export class Route {
    constructor(re, component) {
        this.re = re;
        this.component = component;
    }
}
