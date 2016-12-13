import { LoadingModel } from './../../../Shared/Models/loading.model';
import { ReplaySubject } from 'rxjs';
import { FlashMessageService } from '../../../Shared/FlashMessage/flash-message.service';
import { FlashMessage, FlashMessageType } from '../../../Shared/FlashMessage/flash-message';
import { ViewEncapsulation } from '@angular/core';
import { NotesService } from '../notes.service';
import { NoteModel } from '../../../Shared/Models/note.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export enum EditorState {
	CREATE,
	UPDATE
}

@Component({
	selector: '[note-editor]',
	templateUrl: 'note-editor.component.html',
	styleUrls: ['../notes.component.css'],
	encapsulation: ViewEncapsulation.None
})


export class NoteEditorComponent implements OnInit {
	@Input() createResult: ReplaySubject<LoadingModel>;
	@Input() updateResult: ReplaySubject<LoadingModel>;
	@Input() deleteResult: ReplaySubject<LoadingModel>;
	@Input() currentNote: ReplaySubject<NoteModel>;
	@Output() noteSubmited: EventEmitter<NoteModel> = new EventEmitter<NoteModel>();
	@Output() noteUpdated: EventEmitter<NoteModel> = new EventEmitter<NoteModel>();
	@Output() noteDeleted: EventEmitter<NoteModel> = new EventEmitter<NoteModel>();


	form: FormGroup;
	titleControl: FormControl;
	textControl: FormControl;
	note: NoteModel;
	colors: Array<string>;
	currentState: number = EditorState.CREATE;
	private editorState = EditorState;


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


	setCreateState(event?: Event) {
		if (event != null) {
			event.preventDefault();
		}
		this.form.reset('');
		this.note.color = '';
		this.currentState = this.editorState.CREATE;
		this.form.enable();
	}
	updateNote(event: Event) {
		event.preventDefault();
		this.form.disable();
		this.noteUpdated.emit(this.note);
	}

	deleteNote(event: Event) {
		event.preventDefault();
		this.form.disable();
		this.noteDeleted.emit(this.note);
	}
	createNote(event: Event) {
		event.preventDefault();
		this.form.disable();
		this.noteSubmited.emit(this.note);
	}

	setColor(color: string, event: Event) {
		this.note.color = color;
	}

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