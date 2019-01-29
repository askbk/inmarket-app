import { Module } from '../module.js';
import { ProfileComponent } from './profile.component.js';
import { MyProfileComponent } from './my-profile.component.js';
import { Route } from '../router.js';

export class ProfileModule extends Module {
    constructor(DEBUG_MODE, appRouter, profileService, networkService, pattern) {
        const profilePages = [
            new ProfileComponent(
                DEBUG_MODE,
                profileService,
                appRouter,
                networkService,
                pattern
            ),
            new MyProfileComponent(
                DEBUG_MODE,
                profileService,
                pattern
            )
        ];
        super(DEBUG_MODE, appRouter,
            [
                new Route(/profil\/\d+/, profilePages[0]),
                new Route(/profil\/?/, profilePages[1]),
                new Route(/profil\/meg/, profilePages[1])
            ]
        );
    }
}
