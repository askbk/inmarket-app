import { Module } from '../module.js';
import { ProfileComponent } from './profile.component.js';
import { Router, Route } from '../router.js';

export class ProfileModule extends Module {
    constructor(DEBUG_MODE, appRouter, profileService, pattern) {
        const profilePages = [
            new ProfileComponent(
                DEBUG_MODE,
                profileService,
                appRouter,
                pattern
            ),
            new ProfileComponent(
                DEBUG_MODE,
                profileService,
                appRouter,
                pattern
            )
        ];
        super(DEBUG_MODE, appRouter,
            new Router(DEBUG_MODE, "content"),
            [
                new Route(/profil\/\d+/, profilePages[0]),
                new Route(/profil\/?/, profilePages[1]),
                new Route(/profil\/meg/, profilePages[1])
            ]
        );
        this.profileService = profileService;
    }
}
