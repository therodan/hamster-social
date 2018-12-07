import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { ActiveUserService } from '../services/';

@Injectable()
export class AuthorisationGuard implements CanActivate {
    loggedIn: boolean;

    constructor(private router: Router, private authService: ActiveUserService) {
        this.authService.user$.subscribe(user => {
            if (!user.id) {
                this.loggedIn = false;
            }
            else {
                this.loggedIn = true;
            }
        });
    }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.loggedIn) {
            return true;
        }

        // not logged in so redirect to login page
        this.router.navigate(['/login']);

        return false;
    }
}
