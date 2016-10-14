import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AddUserModel } from '../Models';

@Component({
	selector: 'register',
	templateUrl: 'register.component.html'
})

export class RegisterComponent implements OnInit {
	@Input() result: string;
	@Output() registerUser: EventEmitter<AddUserModel> = new EventEmitter<AddUserModel>();
	username: string;
	password: string;
	passwordConfirmation: string;
	form: FormGroup;
	constructor(private formBuilder: FormBuilder) {
		this.form = formBuilder.group({
			username: new FormControl('', [Validators.minLength(5), Validators.required]),
			password: new FormControl('', [Validators.minLength(5), Validators.required]),
			passwordConfirmation: new FormControl('', [Validators.minLength(5), Validators.required])
		});

	}

	ngOnInit() {

	}

	submitUser() {
		this.registerUser.emit(new AddUserModel(this.username, this.password, this.passwordConfirmation))
	}
}	