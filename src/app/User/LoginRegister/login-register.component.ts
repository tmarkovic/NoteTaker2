import { FlashMessageService, FlashMessage, FlashMessageType } from './../../Shared/FlashMessage/';
import { ReplaySubject } from 'rxjs';
import { LoadingModel } from '../../Shared/Models';
import { UserService } from '../user.service';
import { AddUserModel, UserLogin } from '../Models/user.model';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'login-register',
    templateUrl: 'login-register.component.html'
})
export class LoginRegisterComponent implements OnInit {
    register$: ReplaySubject<LoadingModel> = new ReplaySubject<LoadingModel>();
    login$: ReplaySubject<LoadingModel> = new ReplaySubject<LoadingModel>();
    constructor(private userService: UserService, private flashMessageService: FlashMessageService) { }

    ngOnInit() {

    }


    authenticateUser(user: UserLogin) {

        let loadingModel: LoadingModel = {
            isLoading: true,
            isSuccess: false,
        };

        this.login$.next(loadingModel);
        this.userService.authenticateUser(user).subscribe(x => {
            this.flashMessageService.showMessage(new FlashMessage(FlashMessageType.SUCCES, 'Login succesful, redirecting to user area', 1500));
            console.log(x);
        }, error => {
            loadingModel.isLoading = false;
            loadingModel.isSuccess = false;
            loadingModel.error = error;
            this.flashMessageService.showMessage(new FlashMessage(FlashMessageType.ERROR, 'Invalid credentials', 1000));
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