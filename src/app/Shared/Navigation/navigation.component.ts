import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../User/user.service';


/**
 * Navigation bar component
 * 
 * @export
 * @class NavigationComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'navigation',
    templateUrl: 'navigation.component.html'
})
export class NavigationComponent implements OnInit {
    /**
     * Creates an instance of NavigationComponent.
     * 
     * @param {UserService} userService
     * @param {Router} router
     * 
     * @memberOf NavigationComponent
     */
    constructor(private userService: UserService, private router: Router) {
    }

    /**
     * Terminates current authenticated token
     * 
     * @param {Event} event
     * 
     * @memberOf NavigationComponent
     */
    logout(event: Event) {
        this.userService.logout();
        this.router.navigate(['/user/login']);
    }
    /**
     * 
     * 
     * 
     * @memberOf NavigationComponent
     */
    ngOnInit() {}
}

