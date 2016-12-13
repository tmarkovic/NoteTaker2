import { ValidationService } from './validation.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';


/**
 * Displays validation errors for a given control
 * 
 * @export
 * @class ValidationComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'validation',
    templateUrl: 'validation.component.html'
})
export class ValidationComponent implements OnInit {
    /**
     * Control to display errors for
     * 
     * @type {FormControl}
     * @memberOf ValidationComponent
     */
    @Input() control: FormControl;
    /**
     * Alias for control
     * 
     * @type {string}
     * @memberOf ValidationComponent
     */
    @Input() controlName: string;
    /**
     * Creates an instance of ValidationComponent.
     * 
     * 
     * @memberOf ValidationComponent
     */
    constructor() { }

    /**
     * Iterates over control errors and displays any current errors in view
     * 
     * @readonly
     * 
     * @memberOf ValidationComponent
     */
    get error() {
        for (let validatorError in this.control.errors) {
            if (this.control.errors.hasOwnProperty(validatorError) && this.control.touched) {
                return ValidationService.getValidationError(validatorError, this.control.errors[validatorError], this.controlName);
            }
        }

        return null;
    }

    /**
     * 
     * 
     * 
     * @memberOf ValidationComponent
     */
    ngOnInit() { }
}
