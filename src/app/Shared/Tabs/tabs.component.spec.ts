import { TestBed, inject } from '@angular/core/testing';

import { TabsComponent } from './tabs.component';

describe('a tabs component', () => {
	let component: TabsComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				TabsComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([TabsComponent], (TabsComponent) => {
		component = TabsComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});