// import { GroupService } from './services/groupService.js';
import { AuthService } from './services/authService.js';
import { RegistrationService } from './services/registrationService.js';
import { ProfileService } from './services/profileService.js';
// import { MessageService } from './services/messageService.js';

import { AppRouter, Route} from './appRouter.js';
import { Pattern } from './patternjs/pattern.js';

import { GroupComponent } from './components/groupComponent.js';
import { GroupListComponent } from './components/groupListComponent.js';
import { MessageListComponent } from './components/messageListComponent.js';
import { ErrorComponent } from './components/errorComponent.js';
import { LoginComponent } from './components/loginComponent.js';
import { HomeComponent } from './components/homeComponent.js';
import { RegistrationComponent } from './components/registrationComponent.js';
import { ProfileComponent } from './components/profileComponent.js';

//  Provides extra logging messages
const DEBUG_MODE = true;

//  Construct all services needed
const authService = new AuthService(DEBUG_MODE),
    registrationService = new RegistrationService(DEBUG_MODE),
    profileService = new ProfileService(DEBUG_MODE);

// Construct router
const appRouter = new AppRouter(DEBUG_MODE, "content");

const homeComponent = new HomeComponent(DEBUG_MODE),
    loginComponent = new LoginComponent(DEBUG_MODE, authService, appRouter),
    registrationComponent = new RegistrationComponent(DEBUG_MODE, registrationService, new Pattern(), appRouter),
    profileComponent = new ProfileComponent(DEBUG_MODE, new Pattern(), appRouter, profileService),
    errorComponent = new ErrorComponent(DEBUG_MODE);
    // groupListComponent = new GroupListComponent(DEBUG_MODE, groupService, new Pattern()),
    // groupComponent = new GroupComponent(DEBUG_MODE, groupService, appRouter, new Pattern()),
    // messageListComponent = new MessageListComponent(DEBUG_MODE, messageService, new Pattern());

// Construct list of routes
const routes = [
    // new Route(/\/grupper\/\d+/, new GroupComponent(groupService)),
    new Route(/innlogging\/?/, loginComponent),
    new Route(/registrering\/?/, registrationComponent),
    new Route(/profil\/\d+/, profileComponent),
    // new Route(/grupper\/\d+/, groupComponent),
    // new Route(/grupper\/?/, groupListComponent),
    // new Route(/meldinger\/?/, messageListComponent),
    new Route(/hjem\/?/, homeComponent),
    new Route(/^(?![\s\S])/, homeComponent),
    new Route(/.*/, errorComponent)
];

appRouter.registerRoutes(routes);


// Load external HTML files, register routes and start routing
const getHTML = url => {
    return fetch(url, {
        method: "get"
    }).then(response => {
        return response.text();
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
