import { FlashMessageService } from './../../Shared/FlashMessage/flash-message.service';
import { FlashMessage, FlashMessageType } from './../../Shared/FlashMessage/flash-message';


import { LoadingModel } from '../../Shared/Models';
import { ReplaySubject } from 'rxjs';
import { ValidationService } from './../../Shared/Validation/validation.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { AddUserModel } from '../Models';

@Component({
	selector: 'register',
	templateUrl: 'register.component.html'
})

export class RegisterComponent implements OnInit {
	@Input() result: ReplaySubject<LoadingModel>;
	@Output() registerUser: EventEmitter<AddUserModel> = new EventEmitter<AddUserModel>();
	newUser: AddUserModel;
	form: FormGroup;
	usernameControl: FormControl;
	passwordControl: FormControl;
	passwordConfirmationControl: FormControl;

	constructor(private validationService: ValidationService, private flashMessageService: FlashMessageService) {


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
			value => value,
			error => { this.form.updateValueAndValidity({ onlySelf: false, emitEvent: true })},
			() => {
				this.flashMessageService.showMessage(new FlashMessage(FlashMessageType.SUCCES, 'Registration successful, you may now sign in', 1500));
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