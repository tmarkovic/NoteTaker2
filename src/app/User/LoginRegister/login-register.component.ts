import { FlashMessageService, FlashMessage, FlashMessageType } from './../../Shared/FlashMessage/';
import { ReplaySubject } from 'rxjs';
import { LoadingModel } from '../../Shared/Models';
import { UserService } from '../user.service';
import { AddUserModel, UserLogin } from '../Models/user.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

/**
 * Container component composing the login and registration forms 
 * in a tab-based view
 * 
 * @export
 * @class LoginRegisterComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'login-register',
    templateUrl: 'login-register.component.html'
})
export class LoginRegisterComponent implements OnInit {
    register: ReplaySubject<LoadingModel> = new ReplaySubject<LoadingModel>();
    login: ReplaySubject<LoadingModel> = new ReplaySubject<LoadingModel>();
    /**
     * Creates an instance of LoginRegisterComponent.
     * 
     * @param {UserService} userService
     * @param {FlashMessageService} flashMessageService
     * @param {Router} router
     * 
     * @memberOf LoginRegisterComponent
     */
    constructor(private userService: UserService, private flashMessageService: FlashMessageService, private router: Router) { }

    /**
     * Init
     * 
     * 
     * @memberOf LoginRegisterComponent
     */
    ngOnInit() { }


    /**
     * Tries to authenticate a user with supplied credentials
     * and let subscribing components know of the result
     * Invoked when child login component emits it's authentication event
     * 
     * @param {UserLogin} user
     * 
     * @memberOf LoginRegisterComponent
     */
    authenticateUser(user: UserLogin) {

        let loadingModel: LoadingModel = {
            isLoading: true,
            isSuccess: false,
        };

        this.login.next(loadingModel);
        this.userService.authenticateUser(user).subscribe(x => {
            this.flashMessageService.showMessage(new FlashMessage(
                FlashMessageType.SUCCES, 'Login succesful, redirecting to user area', 1500, (() => this.router.navigate(['/user/notes'])))
            );
        }, error => {
            loadingModel.isLoading = false;
            loadingModel.isSuccess = false;
            loadingModel.error = error;
            this.flashMessageService.showMessage(new FlashMessage(
                FlashMessageType.ERROR, 'Login failed, invalid credentials', 1500)
            );
        },
            () => {
                this.login.complete();
            });
    }
    /**
     * Tries to register a user with supplied credentials
     * and let subscribing components know of the result
     * Invoked when child register component emits it's register event
     * 
     * @param {AddUserModel} newUser
     * 
     * @memberOf LoginRegisterComponent
     */
    registerUser(newUser: AddUserModel) {
        let loadingModel: LoadingModel = {
            isLoading: true,
            isSuccess: false
        };

        this.register.next(loadingModel);
        this.userService.addUser(newUser).subscribe(
            response => {
                if (response.ok) {
                    loadingModel.isLoading = false;
                    loadingModel.isSuccess = true;
                    this.register.next(loadingModel);
                }
            },
            error => {
                loadingModel.isLoading = false;
                loadingModel.isSuccess = false;
                loadingModel.error = error;
                this.register.error(loadingModel);
            },
            () => this.register.complete()
        );
    }
}
