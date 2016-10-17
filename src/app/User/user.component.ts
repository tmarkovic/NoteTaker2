import { Observable, Observer } from 'rxjs';
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
    resultObserver: Observer<any>;
    ngOnInit() {
        this.result = new Observable<any>(obs => this.resultObserver = obs).share();
    }

    registerUser(newUser: AddUserModel) {
        this.resultObserver.next({});
        this.userService.addUser(newUser).subscribe(
            x => this.resultObserver.next(x),
            error => this.resultObserver.error(error),
            () => this.resultObserver.complete()
        );
    }
}