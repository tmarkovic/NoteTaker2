import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../User/user.service';


@Component({
    selector: 'navigation',
    templateUrl: 'navigation.component.html'
})
export class NavigationComponent implements OnInit {
    constructor(private userService: UserService, private router: Router) {
    }

    logout(event: Event) {
        this.userService.logout();
        this.router.navigate(['/user/login']);
    }
    ngOnInit() {}
}

