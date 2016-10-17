import { ValidationService } from './validation.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
    selector: 'validation',
    templateUrl: 'validation.component.html'
})
export class ValidationComponent implements OnInit {
    @Input() control: FormControl;
    @Input() controlName: string;
    constructor() { }

    get error() {
        for (let validatorError in this.control.errors) {
            if (this.control.errors.hasOwnProperty(validatorError) && this.control.touched) {
                return ValidationService.getValidationError(validatorError, this.control.errors[validatorError], this.controlName);
            }
        }

        return null;
    }

    ngOnInit() { }
}