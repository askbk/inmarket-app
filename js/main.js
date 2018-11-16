import { GroupService } from './services/groupService.js';
import { AuthService } from './services/authService.js';
import { RegistrationService } from './services/registrationService.js';
import { MessageService } from './services/messageService.js';

import { AppRouter, Route} from './appRouter.js';
import { Pattern } from './patternjs/pattern.js';

import { GroupComponent } from './components/groupComponent.js';
import { GroupListComponent } from './components/groupListComponent.js';
import { MessageListComponent } from './components/MessageListComponent.js';
import { ErrorComponent } from './components/errorComponent.js';
import { LoginComponent } from './components/loginComponent.js';
import { HomeComponent } from './components/homeComponent.js';
import { RegistrationComponent } from './components/registrationComponent.js';

//  Construct all services needed
const groupService = new GroupService(),
    authService = new AuthService(),
    registrationService = new RegistrationService(),
    messageService = new MessageService();

// Construct router
const appRouter = new AppRouter("content");

const homeComponent = new HomeComponent(),
    loginComponent = new LoginComponent(authService, appRouter),
    registrationComponent = new RegistrationComponent(registrationService, new Pattern(), appRouter),
    errorComponent = new ErrorComponent(),
    groupListComponent = new GroupListComponent(groupService, new Pattern()),
    groupComponent = new GroupComponent(groupService, appRouter, new Pattern()),
    messageListComponent = new MessageListComponent(messageService, new Pattern());

// Construct list of routes
const routes = [
    // new Route(/\/grupper\/\d+/, new GroupComponent(groupService)),
    new Route(/innlogging\/?/, loginComponent),
    new Route(/registrering\/?/, registrationComponent),
    new Route(/grupper\/\d+/, groupComponent),
    new Route(/grupper\/?/, groupListComponent),
    new Route(/meldinger\/?/, messageListComponent),
    new Route(/hjem\/?/, homeComponent),
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
