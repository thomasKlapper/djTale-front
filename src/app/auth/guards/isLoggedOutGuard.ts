import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
    providedIn: 'root'
})
export class IsLoggedOutGuard implements CanActivate {

    constructor(private router: Router, private jwtHelper: JwtHelperService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.isSignedOut();
    }

    isSignedOut = () => {
        if (window.localStorage.getItem('jwt')) {
            const jwt = window.localStorage.getItem('jwt');
            if (!this.isUserTokenExpired(jwt)) {
                this.redirectToHomePage();
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    }

    redirectToHomePage() {
        this.router.navigate(['/home'])
    }

    isUserTokenExpired(rawToken) {
        return this.jwtHelper.isTokenExpired(rawToken);
    }

}