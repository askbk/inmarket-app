import { GroupService } from './services/groupService.js';
import { AuthService } from './services/authService.js';

import { AppRouter, Route} from './appRouter.js';
import { Pattern } from './patternjs/pattern.js';

import { GroupComponent } from './components/groupComponent.js';
import { GroupListComponent } from './components/groupListComponent.js';
import { ErrorComponent } from './components/errorComponent.js';
import { LoginComponent } from './components/loginComponent.js';
import { HomeComponent } from './components/homeComponent.js';

//  Construct all services needed
const groupService = new GroupService(),
    authService = new AuthService();

// Construct router
const appRouter = new AppRouter("content");

const homeComponent = new HomeComponent(),
    loginComponent = new LoginComponent(authService, appRouter),
    errorComponent = new ErrorComponent();

// Construct list of routes
const routes = [
    // new Route(/\/grupper\/\d+/, new GroupComponent(groupService)),
    new Route(/\innlogging\/?/, loginComponent),
    new Route(/\grupper\/?/, new GroupListComponent(groupService, new Pattern())),
    // new Route(/\/samtaler\/\d+/, new ConversationComponent(messageService)),
    // new Route(/\/samtaler\/?/, new ConversationListComponent()),
    new Route(/\hjem\/?/, homeComponent),
    new Route(/^(?![\s\S])/, homeComponent),
    new Route(/.*/, errorComponent)
];

appRouter.registerRoutes(routes);


// Load external HTML files, register routes and start routing
const getHTML = url => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            success: function (htmlContent) {
                resolve(htmlContent)
            },
            error: function () {
                reject("error")
            }
        });
    });
};

let iterations = [];

Object.keys(appRouter.routes).forEach((page,index) => {
    let html = getHTML(routes[index].component.htmlUrl)
        .then((result) => {
            routes[index].component.page = result;
        }
    );

    iterations.push(html);
});

Promise.all(iterations)
    .then(() => {
        appRouter.route();
    });

window.onhashchange = function () {
    appRouter.route();
};
