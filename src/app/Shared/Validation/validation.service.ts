import { Injectable } from '@angular/core';

@Injectable()
export class ValidationService {


    static getValidationError(validatorError: string, validatorValue?: any, controlName?: string): string {
        let validationMessage: Object = {
            'minLength': `must be longer than ${validatorValue.requiredLength}`,
            'required': 'cannot be empty',
            'passwordMatch': 'does not match'
        }

        return `${controlName ? controlName : 'Entered value'} ${validationMessage[validatorError]}`;
    }
    constructor() { }
}