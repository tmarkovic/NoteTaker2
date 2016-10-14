import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'login',
	templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
	username: string;
	password: string;
	ngOnInit() { }
}