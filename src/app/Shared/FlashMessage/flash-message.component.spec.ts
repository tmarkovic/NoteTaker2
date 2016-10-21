import { TestBed, inject } from '@angular/core/testing';

import { FlashMessageComponent } from './flash-message.component';

describe('a flash-message component', () => {
	let component: FlashMessageComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				FlashMessageComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([FlashMessageComponent], (FlashMessageComponent) => {
		component = FlashMessageComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});