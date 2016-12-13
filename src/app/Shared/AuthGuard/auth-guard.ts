import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../../User/user.service';
import { Observable } from 'rxjs/Observable';

/**
 * Used by the Angular2 router as an implementation
 * for guarding restricted routes
 * 
 * @export
 * @class AuthGuard
 * @implements {CanActivate}
 */
@Injectable()
export class AuthGuard implements CanActivate {
    /**
     * Creates an instance of AuthGuard.
     * 
     * @param {UserService} userService
     * @param {Router} router
     * 
     * @memberOf AuthGuard
     */
    constructor(private userService: UserService, private router: Router) { }

    /**
     * Checks if userService has an authenticated user
     * otherwise redirect to login page
     * 
     * @returns {Observable<boolean>} authenticated user exists or not 
     * 
     * @memberOf AuthGuard
     */
    canActivate(): Observable<boolean> {
        return Observable.of(this.userService.isAuthenticated).map(auth => auth).take(1).do(auth => {
            if (!auth) {
                this.router.navigate(['/user/login']);
            }
        });
    }
}
