import { Observable } from 'rxjs/Observable';
import { ValidationService } from './../../Shared/Validation/validation.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { AddUserModel } from '../Models';

@Component({
	selector: 'register',
	templateUrl: 'register.component.html'
})

export class RegisterComponent implements OnInit {
	@Input() result: Observable<any>;
	@Output() registerUser: EventEmitter<AddUserModel> = new EventEmitter<AddUserModel>();
	isLoading: boolean;
	isSuccess: boolean;
	newUser: AddUserModel;
	form: FormGroup;
	usernameControl: FormControl;
	passwordControl: FormControl;
	passwordConfirmationControl: FormControl;

	constructor(private formBuilder: FormBuilder, private validationService: ValidationService) {


		this.newUser = {
			username: '',
			password: '',
			passwordConfirmation: ''
		};

		this.form = new FormGroup({
			username: new FormControl(
				this.newUser.username,
				Validators.compose([Validators.minLength(5), Validators.required]),
				this.validationService.validateUsernameAvailability()
			),
			password: new FormControl(this.newUser.password, [Validators.minLength(5), Validators.required]),
			passwordConfirmation: new FormControl(this.newUser.passwordConfirmation, [Validators.minLength(5), Validators.required])
		},
			this.validationService.matchValues(
				{
					controlName: 'password',
					matchingControl: 'password confirmation'
				}, {
					controlName: 'passwordConfirmation',
					matchingControl: 'password'
				})

		);

		this.usernameControl = this.form.controls['username'] as FormControl;
		this.passwordControl = this.form.controls['password'] as FormControl;
		this.passwordConfirmationControl = this.form.controls['passwordConfirmation'] as FormControl;
	}

	ngOnInit() {
		this.result.subscribe(
			x => { this.isLoading = true; console.log(x) },
			error => { this.isSuccess = false; this.form.updateValueAndValidity({ onlySelf: false, emitEvent: true }) },
			() => {
				this.isLoading = false;
				this.isSuccess = true;
				this.form.reset();
			}
		)
	}

	submitUser() {
		console.log(this.newUser);
		if (this.form.valid) {
			this.registerUser.emit(this.newUser);
		}
	}
}	