import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
    providedIn: 'root'
})
export class IsLoggedInGuard implements CanActivate {

    constructor(private router: Router, private jwtHelper: JwtHelperService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.isSignedIn();
    }

    isSignedIn = () => {
        if (window.localStorage.getItem('jwt')) {
            const jwt = window.localStorage.getItem('jwt');
            if (!this.isUserTokenExpired(jwt)) {
                return true;
            } else {
                this.redirectToLoginPage();
                return false;
            }
        } else {
            this.redirectToLoginPage();
            return false;
        }
    }

    redirectToLoginPage() {
        window.localStorage.removeItem('user');
        window.localStorage.removeItem('jwt');
        this.router.navigate(['auth/login']);
    }

    isUserTokenExpired(rawToken) {
        return this.jwtHelper.isTokenExpired(rawToken);
    }

}