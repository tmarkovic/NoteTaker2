import { Injectable } from '@angular/core';

@Injectable()
export class ValidationService {


    static getValidationError(validatorError: string, validatorValue?: any): string {
        let validationMessage: Object = {
            'minLength': `must be longer than ${validatorValue.requiredLength}`,
            'required': 'cannot be empty',
            'passwordMatch': 'does not match'
        }

        return `${validationMessage[validatorError]}`;
    }
    constructor() { }
}