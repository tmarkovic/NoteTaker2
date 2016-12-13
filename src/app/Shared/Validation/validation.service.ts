import { UserService } from './../../User/user.service';
import { Observable } from 'rxjs/Observable';
import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { Injectable } from '@angular/core';

/**
 * Service for handling custom validation logic and their responses
 * 
 * @export
 * @class ValidationService
 */
@Injectable()
export class ValidationService {


    /**
     * Generates a validation error message for a specific error
     * with suplied parameters
     * 
     * @static
     * @param {string} validatorError name of the validation error
     * @param {*} [validatorValue] suplied validation parameters
     * @param {string} [controlName] alias for the control containing the error
     * @returns {string} An error message
     * 
     * @memberOf ValidationService
     */
    static getValidationError(validatorError: string, validatorValue?: any, controlName?: string): string {
        let validationMessage: Object = {
            'minlength': `${controlName ? controlName : ''} must be longer than ${validatorValue.requiredLength} characters`,
            'required': `${controlName ? controlName : ''} is required`,
            'notEqual': `${controlName ? controlName : ''} does not match ${validatorValue.matchingControl}`,
            'notAvaliable': `${controlName ? controlName : ''} "${validatorValue.value}" is not avaliable`,
            'error': 'An error has occured',
            '': ''
        };

        return `${validationMessage[validatorError]}`.trim();
    }

    /**
     * Creates an instance of ValidationService.
     * 
     * @param {UserService} userService
     * 
     * @memberOf ValidationService
     */
    constructor(private userService: UserService) { }

    // TODO: Loop logic
    /**
     * Validates that two controls contain the same value
     * 
     * @param {...controls} collection of controls to match
     * @returns callbackFn for invoking validation
     * 
     * @memberOf ValidationService
     */
    public matchValues(...controls: { controlName: string, matchingControl: string }[]): ValidatorFn {
        return (group: FormGroup) => {

            let password = group.controls[controls[0].controlName];
            let passwordConfirmation = group.controls[controls[1].controlName];
            if (password.value !== passwordConfirmation.value && password.touched) {
                password.setErrors({ 'notEqual': { matchingControl: controls[0].matchingControl } });
                passwordConfirmation.setErrors({ 'notEqual': { matchingControl: controls[1].matchingControl } });
            } else {
                password.setErrors(password.validator(password));
                passwordConfirmation.setErrors(passwordConfirmation.validator(passwordConfirmation));
            }
            return null;
        };
    }



    /**
     * Asyncronously validates username avaliability against the API
     * 
     * @returns
     * 
     * @memberOf ValidationService
     */
    public validateUsernameAvailability(): ValidatorFn {
        return (control: FormControl) => {
            if (control.value.length > 0 && control.value != null) {
                return new Observable<Object>((observer: any) => {
                    control
                        .valueChanges
                        .debounceTime(400)
                        .distinctUntilChanged((a, b) => a !== b)
                        .switchMap(value => this.userService.getUsernameAvailability(value))
                        .subscribe(response => {
                            if (response.available) {
                                observer.next(null);
                                observer.complete();
                            } else {
                                observer.next({ 'notAvaliable': { value: response.username } });
                                observer.complete();
                            }
                        },
                        error => {
                            observer.next({ 'error': true });
                            observer.complete();
                        });
                });
            }
        };
    }
}
