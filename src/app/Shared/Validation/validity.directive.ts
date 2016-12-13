import { FormControl } from '@angular/forms';
import { Directive, Input, Renderer, ElementRef } from '@angular/core';

@Directive({
    selector: '[validity]',
})
export class ValidityDirective {
    @Input() control: FormControl;
    @Input() validationClasses: { invalid: string, valid: string, pristine: string };
    constructor(el: ElementRef, renderer: Renderer) {
        this.control.statusChanges.subscribe(x => console.log(x))
    }


}