import { LoadingModel } from './../../../Shared/Models/loading.model';
import { ReplaySubject } from 'rxjs';
import { FlashMessageService } from '../../../Shared/FlashMessage/flash-message.service';
import { FlashMessage, FlashMessageType } from '../../../Shared/FlashMessage/flash-message';
import { ViewEncapsulation } from '@angular/core';
import { NotesService } from '../notes.service';
import { NoteModel } from '../../../Shared/Models/note.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

/**
 * Enum representing the editors current state
 * 
 * @export
 * @enum {number}
 */
export enum EditorState {
	CREATE,
	UPDATE
}

/**
 * Responsible for handling note CRUD operations in the viewc
 * 
 * @export
 * @class NoteEditorComponent
 * @implements {OnInit}
 */
@Component({
	selector: '[note-editor]',
	templateUrl: 'note-editor.component.html',
	styleUrls: ['../notes.component.css'],
	encapsulation: ViewEncapsulation.None
})


export class NoteEditorComponent implements OnInit {
	/**
	 * ReplaySubject emiting values regarding create events
	 * 
	 * @type {ReplaySubject<LoadingModel>}
	 * @memberOf NoteEditorComponent
	 */
	@Input() createResult: ReplaySubject<LoadingModel>;
	/**
	 * ReplaySubject emiting values regarding update events
	 * 
	 * @type {ReplaySubject<LoadingModel>}
	 * @memberOf NoteEditorComponent
	 */
	@Input() updateResult: ReplaySubject<LoadingModel>;
	/**
	 * ReplaySubject emiting values regarding delete events
	 * 
	 * @type {ReplaySubject<LoadingModel>}
	 * @memberOf NoteEditorComponent
	 */
	@Input() deleteResult: ReplaySubject<LoadingModel>;
	/**
	 * ReplaySubject emiting values from a stream of notes
	 * 
	 * @type {ReplaySubject<NoteModel>}
	 * @memberOf NoteEditorComponent
	 */
	@Input() currentNote: ReplaySubject<NoteModel>;
	/**
	 * Event emitter for delegating note submiting to parent component
	 * 
	 * @type {EventEmitter<NoteModel>}
	 * @memberOf NoteEditorComponent
	 */
	@Output() noteSubmited: EventEmitter<NoteModel> = new EventEmitter<NoteModel>();
	/**
	 * Event emitter for delegating note updating to parent component
	 * 
	 * @type {EventEmitter<NoteModel>}
	 * @memberOf NoteEditorComponent
	 */
	@Output() noteUpdated: EventEmitter<NoteModel> = new EventEmitter<NoteModel>();
	/**
	 * Event emitter for delegating note deletion to parent component
	 * 
	 * @type {EventEmitter<NoteModel>}
	 * @memberOf NoteEditorComponent
	 */
	@Output() noteDeleted: EventEmitter<NoteModel> = new EventEmitter<NoteModel>();



	form: FormGroup;
	titleControl: FormControl;
	textControl: FormControl;
	note: NoteModel;
	colors: Array<string>;
	currentState: number = EditorState.CREATE;
	private editorState = EditorState;


	/**
	 * Creates an instance of NoteEditorComponent.
	 * 
	 * 
	 * @memberOf NoteEditorComponent
	 */
	constructor() {
		this.colors = ['red', 'green', 'yellow', 'blue'];
		this.note = {
			title: '',
			text: ''
		};

		this.form = new FormGroup({
			title: new FormControl('', [Validators.required]),
			text: new FormControl('', [Validators.required])
		});

		this.titleControl = this.form.controls['title'] as FormControl;
		this.textControl = this.form.controls['text'] as FormControl;
	}


	/**
	 * Updates the components state for creating new notes
	 * 
	 * @param {Event} [event]
	 * 
	 * @memberOf NoteEditorComponent
	 */
	setCreateState(event?: Event) {
		if (event != null) {
			event.preventDefault();
		}
		this.form.reset('');
		this.note.color = '';
		this.currentState = this.editorState.CREATE;
		this.form.enable();
	}
	/**
	 * View event for invoking parent note update event
	 * 
	 * @param {Event} event
	 * 
	 * @memberOf NoteEditorComponent
	 */
	updateNote(event: Event) {
		event.preventDefault();
		this.form.disable();
		this.noteUpdated.emit(this.note);
	}

	/**
	 * View event for invoking parent note deletion event
	 * 
	 * @param {Event} event
	 * 
	 * @memberOf NoteEditorComponent
	 */
	deleteNote(event: Event) {
		event.preventDefault();
		this.form.disable();
		this.noteDeleted.emit(this.note);
	}
	/**
	 * View event for invoking parent note creation event
	 * 
	 * @param {Event} event
	 * 
	 * @memberOf NoteEditorComponent
	 */
	createNote(event: Event) {
		event.preventDefault();
		this.form.disable();
		this.noteSubmited.emit(this.note);
	}

	/**
	 * View event for seting current notes color
	 * 
	 * @param {string} color
	 * @param {Event} event
	 * 
	 * @memberOf NoteEditorComponent
	 */
	setColor(color: string, event: Event) {
		this.note.color = color;
	}

	/**
	 * Set up subscriptions and according actions 
	 * for input event streams
	 * 
	 * @memberOf NoteEditorComponent
	 */
	ngOnInit() {
		this.createResult.subscribe(
			(result: LoadingModel) => {
				if (result.isSuccess) {
					this.form.reset('');
					this.note.color = '';
					this.form.enable();
				}
			}
		);

		this.updateResult.subscribe(
			(result: LoadingModel) => {
				if (result.isSuccess) {
					this.form.enable();
				}
			}
		);

		this.deleteResult.subscribe(
			(result: LoadingModel) => {
				if (result.isSuccess) {
					this.form.enable();
				}
			}
		);

		this.currentNote.subscribe((note: NoteModel) => {
			if (note != null) {
				this.currentState = this.editorState.UPDATE;
				this.note = note;
				if (this.note.text == null) {
					this.form.disable();
				} else {
					this.form.enable();
				}
			} else {
				this.setCreateState();
			}

		},
			err => console.log(err),
			() => {
				this.form.enable();
			}
		);
	}
}
