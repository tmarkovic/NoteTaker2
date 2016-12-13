import { LoadingModel } from './../../../Shared/Models/loading.model';
import { ReplaySubject, Observable } from 'rxjs';
import { ViewEncapsulation } from '@angular/core';
import { NoteModel } from '../../../Shared/Models/note.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

/**
 * 
 * 
 * @export
 * @class NoteListComponent
 * @implements {OnInit}
 */
@Component({
	selector: '[note-list]',
	templateUrl: 'note-list.component.html',
	styleUrls: ['../notes.component.css'],
	encapsulation: ViewEncapsulation.None
})


export class NoteListComponent implements OnInit {
	/**
	 * ReplaySubject emiting results of parent components operations
	 * 
	 * @type {ReplaySubject<LoadingModel>}
	 * @memberOf NoteListComponent
	 */
	@Input() result: ReplaySubject<LoadingModel>;
	/**
	 * A collection of notes to display
	 * 
	 * @type {NoteModel[]}
	 * @memberOf NoteListComponent
	 */
	@Input() notes: NoteModel[];
	/**
	 * Event emitter for delegating note retrival to parent component
	 * 
	 * @type {EventEmitter<NoteModel>}
	 * @memberOf NoteListComponent
	 */
	@Output() loadNote: EventEmitter<NoteModel> = new EventEmitter<NoteModel>();

	/**
	 * Creates an instance of NoteListComponent.
	 * 
	 * 
	 * @memberOf NoteListComponent
	 */
	constructor() {

	}

	/**
	 * View event for invoking note loading event
	 * 
	 * @param {NoteModel} note
	 * @param {Event} event
	 * 
	 * @memberOf NoteListComponent
	 */
	noteSelected(note: NoteModel, event: Event) {
		event.preventDefault();
		this.loadNote.emit(note);
	}

	/**
	 * Init
	 * 
	 * 
	 * @memberOf NoteListComponent
	 */
	ngOnInit() {

	}
}
