import { LoadingModel } from './../../Shared/Models/loading.model';
import { ReplaySubject } from 'rxjs';
import { UserLogin } from './../Models/';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from './../user.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
	selector: 'login',
	templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
	@Input() result: ReplaySubject<LoadingModel>;
	@Output() authenticateUser: EventEmitter<UserLogin> = new EventEmitter<UserLogin>();
	form: FormGroup;
	usernameControl: FormControl;
	passwordControl: FormControl;
	loginUser: UserLogin;


	constructor(userService: UserService) {

		this.loginUser = {
			username: '',
			password: ''
		}

		this.form = new FormGroup({
			username: new FormControl(this.loginUser.username, [Validators.required, Validators.minLength(5)]),
			password: new FormControl(this.loginUser.password, [Validators.required, Validators.minLength(5)])
		});

		this.usernameControl = this.form.controls['username'] as FormControl;
		this.passwordControl = this.form.controls['password'] as FormControl;


	}

	login() {
		if (this.form.valid) {
			this.authenticateUser.emit(this.loginUser);
		}
	}

	ngOnInit() { }
}