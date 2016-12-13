import { TestBed, inject } from '@angular/core/testing';

import { NoteEditorComponent } from './note-editor.component';

describe('a note-editor component', () => {
	let component: NoteEditorComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				NoteEditorComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([NoteEditorComponent], (NoteEditorComponent) => {
		component = NoteEditorComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});