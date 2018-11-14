import { GroupService } from './services/groupService.js';
import { AuthService } from './services/authService.js';
import { GroupComponent } from './components/groupComponent.js';
import { AppRouter, Route} from './appRouter.js';
import { ErrorComponent } from './components/errorComponent.js';
import { LoginComponent } from './components/loginComponent.js';

//  Construct all services needed
// const groupService = new GroupService(),
const    authService = new AuthService();

// Construct list of routes
const routes = [
    // new Route(/\/grupper\/\d+/, new GroupComponent(groupService)),
    new Route(/\/innlogging\/?/, new LoginComponent(authService)),
    // new Route(/\/grupper\/?/, new GroupListComponent()),
    // new Route(/\/samtaler\/\d+/, new ConversationComponent(messageService)),
    // new Route(/\/samtaler\/?/, new ConversationListComponent()),
    // new Route(/\/hjem\/?/, new HomeComponent()),
    new Route(/.*/, new ErrorComponent())
];

// Construct router
const appRouter = new AppRouter("content");

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
