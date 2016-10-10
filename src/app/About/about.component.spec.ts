import { TestBed, inject } from '@angular/core/testing';

import { AboutComponent } from './About.component';

describe('a About component', () => {
	let component: AboutComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				AboutComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([AboutComponent], (AboutComponent) => {
		component = AboutComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});