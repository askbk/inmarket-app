import { AuthService } from './services/authService.js';
import { RegistrationService } from './services/registrationService.js';
import { ProfileService } from './services/profileService.js';

import { Router, Route} from './appRouter.js';
import { Pattern } from './patternjs/pattern.js';

import { RegistrationModule } from './modules/registrationModule.js';

import { ErrorComponent } from './components/errorComponent.js';
import { LoginComponent } from './components/loginComponent.js';
import { HomeComponent } from './components/homeComponent.js';
import { ProfileComponent } from './components/profileComponent.js';

//  Provides extra logging messages
const DEBUG_MODE = true;

//  Construct all services needed
const authService = new AuthService(DEBUG_MODE),
    registrationService = new RegistrationService(DEBUG_MODE),
    profileService = new ProfileService(DEBUG_MODE);

const requiredServicesStart = [
    registrationService.start()
];

// Construct router
const appRouter = new Router(DEBUG_MODE, "content");

const registrationModule = new RegistrationModule(DEBUG_MODE, appRouter, registrationService, new Pattern());

const homeComponent = new HomeComponent(DEBUG_MODE),
    loginComponent = new LoginComponent(DEBUG_MODE, authService, appRouter),
    profileComponent = new ProfileComponent(DEBUG_MODE, new Pattern(), appRouter, profileService),
    errorComponent = new ErrorComponent(DEBUG_MODE);

// Construct list of routes
const routes = [
    new Route(/innlogging\/?/, loginComponent),
    new Route(/registrering\/?/, registrationModule),
    new Route(/profil\/\d+/, profileComponent),
    new Route(/hjem\/?/, homeComponent),
    new Route(/^(?![\s\S])/, homeComponent),
    new Route(/.*/, errorComponent)
];

appRouter.registerRoutes(routes);

Promise.all(requiredServicesStart)
.then(() => {
    appRouter.route();
});

window.addEventListener("hashchange", appHashChangeHandler);

function appHashChangeHandler() {
    appRouter.route();
}
// window.onhashchange = () => {
// };
