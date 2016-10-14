import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';
import { AddUserModel } from './Models/user.model';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'user',
    templateUrl: 'user.component.html'
})
export class UserComponent implements OnInit {
    constructor(private userService: UserService) { }
    result: Observable<any>;
    ngOnInit() { }

    registerUser(newUser: AddUserModel) {
        this.result = this.userService.addUser(newUser).catch(error => Observable.of(error.error));
    }
}