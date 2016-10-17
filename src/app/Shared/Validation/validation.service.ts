import { UserService } from './../../User/user.service';
import { Observable } from 'rxjs/Observable';
import { FormControl, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class ValidationService {


    static getValidationError(validatorError: string, validatorValue?: any, controlName?: string): string {
        let validationMessage: Object = {
            'minlength': `${controlName ? controlName : ''} must be longer than ${validatorValue.requiredLength} characters`,
            'required': `${controlName ? controlName : ''} is required`,
            'notEqual': `${controlName ? controlName : ''} does not match ${validatorValue.matchingControl}`,
            'notAvaliable': `${controlName ? controlName : ''} "${validatorValue.value}" is not avaliable`,
            'error': 'An error has occured',
            '': ''
        }

        return `${validationMessage[validatorError]}`.trim();
    }

    constructor(private userService: UserService) { }

    // TODO: Loop logic
    public matchValues(...controls: { controlName: string, matchingControl: string }[]) {
        return (group: FormGroup) => {

            let password = group.controls[controls[0].controlName];
            let passwordConfirmation = group.controls[controls[1].controlName]
            if (password.value !== passwordConfirmation.value && password.touched) {
                password.setErrors({ 'notEqual': { matchingControl: controls[0].matchingControl } });
                passwordConfirmation.setErrors({ 'notEqual': { matchingControl: controls[1].matchingControl } });
            } else {
                password.setErrors(password.validator(password));
                passwordConfirmation.setErrors(passwordConfirmation.validator(passwordConfirmation));
            }
            return null;
        }
    }



    public validateUsernameAvailability() {
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
        }
    }






}

