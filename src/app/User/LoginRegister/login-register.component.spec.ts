import { TestBed, inject } from '@angular/core/testing';

import { SignInBoxComponent } from './sign-in-box.component';

describe('a sign-in-box component', () => {
	let component: SignInBoxComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				SignInBoxComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([SignInBoxComponent], (SignInBoxComponent) => {
		component = SignInBoxComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});