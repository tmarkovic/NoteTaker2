import { ReplaySubject } from 'rxjs';
import { LoadingModel } from '../Shared/Models';
import { UserService } from './user.service';
import { AddUserModel, UserLogin } from './Models/user.model';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'user',
    templateUrl: 'user.component.html'
})
export class UserComponent implements OnInit {
    register$: ReplaySubject<LoadingModel> = new ReplaySubject<LoadingModel>();
    login$: ReplaySubject<LoadingModel> = new ReplaySubject<LoadingModel>();
    constructor(private userService: UserService) { }

    ngOnInit() {

    }


    authenticateUser(user: UserLogin) {

        let loadingModel: LoadingModel = {
            isLoading: true,
            isSuccess: false,
        };

        this.login$.next(loadingModel);
        this.userService.authenticateUser(user).subscribe(x => {
            console.log(x);
        }, error => {
            loadingModel.isLoading = false;
            loadingModel.isSuccess = false;
            loadingModel.error = error;
            error => this.login$.error(loadingModel);
        },
            () => {
                this.login$.complete();
            });
    }
    registerUser(newUser: AddUserModel) {
        let loadingModel: LoadingModel = {
            isLoading: true,
            isSuccess: false
        };

        this.register$.next(loadingModel);
        this.userService.addUser(newUser).subscribe(
            response => {
                if (response.ok) {
                    loadingModel.isLoading = false;
                    loadingModel.isSuccess = true;
                    this.register$.next(loadingModel)
                }
            },
            error => {
                loadingModel.isLoading = false;
                loadingModel.isSuccess = false;
                loadingModel.error = error;
                this.register$.error(loadingModel);
            },
            () => this.register$.complete()
        );
    }
}