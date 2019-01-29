import { AuthService } from './services/authService.js';
import { RegistrationService } from './services/registrationService.js';
import { ProfileService } from './services/profileService.js';
import { NetworkService } from './services/network.service.js';

import { Router } from './router.js';
import { Pattern } from './patternjs/pattern.js';

import { AppModule } from './app.module.js';
import { RegistrationModule } from './registration/registrationModule.js';
import { ProfileModule } from './profile/profile.module.js';
import { NetworkModule } from './network/network.module.js';

import { ErrorComponent } from './components/errorComponent.js';

//  Provides extra logging messages
const DEBUG_MODE = true;

//  Construct all services needed
const profileService = new ProfileService(DEBUG_MODE);
const authService = new AuthService(DEBUG_MODE, profileService),
    registrationService = new RegistrationService(DEBUG_MODE),
    networkService = new NetworkService(DEBUG_MODE);

const requiredServicesStart = [
    // registrationService.start()
];

// Construct router and rendering engine
const appRouter = new Router(DEBUG_MODE, "content", new ErrorComponent(DEBUG_MODE)),
    pattern = new Pattern();

const appModule = new AppModule(DEBUG_MODE, appRouter, authService),
    registrationModule = new RegistrationModule(DEBUG_MODE, appRouter, registrationService, pattern),
    profileModule = new ProfileModule(DEBUG_MODE, appRouter, profileService, networkService, pattern),
    networkModule = new NetworkModule(DEBUG_MODE, appRouter, networkService, pattern);

Promise.all(requiredServicesStart)
.then(() => {
    appRouter.route();
});

window.addEventListener("hashchange", appHashChangeHandler);

function appHashChangeHandler() {
    appRouter.route();
}
