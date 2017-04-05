import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AccountService } from './account-service';

@Injectable()
export class LoginGuard implements CanActivate {
    constructor(private accountService: AccountService, private router: Router) { }

    canActivate() {
        if (this.accountService.isLoggedIn()) {
            return true;
        }

        this.router.navigate(['/login']);
        return false;
     }
}

@Injectable()
export class LogoutGuard implements CanActivate {
    constructor(private accountService: AccountService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // console.log(route, state);
        if(!this.accountService.isLoggedIn()) {
            return true;
        }
     }
}