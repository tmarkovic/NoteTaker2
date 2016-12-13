import { FlashMessageService } from './../../Shared/FlashMessage/flash-message.service';
import { FlashMessage, FlashMessageType } from './../../Shared/FlashMessage/flash-message';
import { LoadingModel } from '../../Shared/Models';
import { ReplaySubject } from 'rxjs';
import { ValidationService } from './../../Shared/Validation/validation.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { AddUserModel } from '../Models';

/**
 * Registration form for the application
 * 
 * @export
 * @class RegisterComponent
 * @implements {OnInit}
 */
@Component({
	selector: 'register',
	templateUrl: 'register.component.html'
})

export class RegisterComponent implements OnInit {
	/**
	 * Emits event information supplied by this components parent
	 * 
	 * @type {ReplaySubject<LoadingModel>}
	 * @memberOf RegisterComponent
	 */
	@Input() result: ReplaySubject<LoadingModel>;
	/**
	 * Outgoing event signaling that the register form has been submited
	 * 
	 * @type {EventEmitter<AddUserModel>}
	 * @memberOf RegisterComponent
	 */
	@Output() registerUser: EventEmitter<AddUserModel> = new EventEmitter<AddUserModel>();

	newUser: AddUserModel;
	form: FormGroup;
	usernameControl: FormControl;
	passwordControl: FormControl;
	passwordConfirmationControl: FormControl;

	/**
	 * Creates an instance of RegisterComponent.
	 * 
	 * @param {ValidationService} validationService
	 * @param {FlashMessageService} flashMessageService
	 * 
	 * @memberOf RegisterComponent
	 */
	constructor(private validationService: ValidationService, private flashMessageService: FlashMessageService) {


		this.newUser = {
			username: '',
			password: '',
			passwordConfirmation: ''
		};

		// Creates a new formgroup containing controls and their validation functions
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

		// simplifies template binding
		this.usernameControl = this.form.controls['username'] as FormControl;
		this.passwordControl = this.form.controls['password'] as FormControl;
		this.passwordConfirmationControl = this.form.controls['passwordConfirmation'] as FormControl;
	}

	/**
	 * Logic for subscribing to supplied events
	 * 
	 * 
	 * @memberOf RegisterComponent
	 */
	ngOnInit() {
		this.result.subscribe(
			value => value,
			error => { this.form.updateValueAndValidity({ onlySelf: false, emitEvent: true }); },
			() => {
				this.flashMessageService.showMessage(new FlashMessage(FlashMessageType.SUCCES, 'Registration successful, you may now sign in', 1500));
				this.form.reset();
			}
		);
	}

	/**
	 * Emits event for user creation to parent component
	 * 
	 * @memberOf RegisterComponent
	 */
	submitUser() {
		if (this.form.valid) {
			this.registerUser.emit(this.newUser);
		}
	}
}
