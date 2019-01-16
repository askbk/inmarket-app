import { AuthService } from './services/authService.js';
import { RegistrationService } from './services/registrationService.js';
import { ProfileService } from './services/profileService.js';

import { Router, Route} from './appRouter.js';
import { Pattern } from './patternjs/pattern.js';

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
const appRouter = new Router(DEBUG_MODE, "content");

const homeComponent = new HomeComponent(DEBUG_MODE),
    loginComponent = new LoginComponent(DEBUG_MODE, authService, appRouter),
    registrationComponent = new RegistrationComponent(DEBUG_MODE, registrationService, new Pattern(), appRouter),
    profileComponent = new ProfileComponent(DEBUG_MODE, new Pattern(), appRouter, profileService),
    errorComponent = new ErrorComponent(DEBUG_MODE);

// Construct list of routes
const routes = [
    new Route(/innlogging\/?/, loginComponent),
    new Route(/registrering\/?/, registrationComponent),
    new Route(/profil\/\d+/, profileComponent),
    new Route(/hjem\/?/, homeComponent),
    new Route(/^(?![\s\S])/, homeComponent),
    new Route(/.*/, errorComponent)
];

appRouter.registerRoutes(routes);

appRouter.route();
window.onhashchange = () => {
    appRouter.route();
};
