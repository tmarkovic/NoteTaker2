import { TestBed, inject } from '@angular/core/testing';

import { TabComponent } from './tab.component';

describe('a tab component', () => {
	let component: TabComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				TabComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([TabComponent], (TabComponent) => {
		component = TabComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});