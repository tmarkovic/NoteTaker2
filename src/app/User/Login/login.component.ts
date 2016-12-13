import { LoadingModel } from './../../Shared/Models/loading.model';
import { ReplaySubject } from 'rxjs';
import { UserLogin } from './../Models/';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

/**
 * Login form handling user input and validation
 * 
 * @export
 * @class LoginComponent
 * @implements {OnInit}
 */
@Component({
	selector: 'login',
	templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
	/**
	 * ReplaySubject emiting values regarding authentication events
	 * 
	 * @type {ReplaySubject<LoadingModel>}
	 * @memberOf LoginComponent
	 */
	@Input() result: ReplaySubject<LoadingModel>;
	/**
	 * Event emitter for delegating user authentication to parent component
	 * 
	 * @type {EventEmitter<UserLogin>}
	 * @memberOf LoginComponent
	 */
	@Output() authenticateUser: EventEmitter<UserLogin> = new EventEmitter<UserLogin>();

	form: FormGroup;
	usernameControl: FormControl;
	passwordControl: FormControl;
	loginUser: UserLogin;


	/**
	 * Creates an instance of LoginComponent.
	 * 
	 * 
	 * @memberOf LoginComponent
	 */
	constructor() {

		this.loginUser = {
			username: '',
			password: ''
		};

		// Creates a new formgroup containing controls and their validation functions
		this.form = new FormGroup({
			username: new FormControl(this.loginUser.username, [Validators.required, Validators.minLength(5)]),
			password: new FormControl(this.loginUser.password, [Validators.required, Validators.minLength(5)])
		});

		// simplifies template binding
		this.usernameControl = this.form.controls['username'] as FormControl;
		this.passwordControl = this.form.controls['password'] as FormControl;


	}

	/**
	 * Emits event for user authentication to parent component
	 * 
	 * 
	 * @memberOf LoginComponent
	 */
	login() {
		if (this.form.valid) {
			this.authenticateUser.emit(this.loginUser);
		}
	}

	/**
	 * 
	 * 
	 * 
	 * @memberOf LoginComponent
	 */
	ngOnInit() { }
}
