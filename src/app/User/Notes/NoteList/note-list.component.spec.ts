import { TestBed, inject } from '@angular/core/testing';

import { NoteListComponent } from './note-list.component';

describe('a note-editor component', () => {
	let component: NoteListComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				NoteListComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([NoteListComponent], (NoteListComponent) => {
		component = NoteListComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});