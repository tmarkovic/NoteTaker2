import { LoadingModel } from './../../../Shared/Models/loading.model';
import { ReplaySubject, Observable } from 'rxjs';
import { ViewEncapsulation } from '@angular/core';
import { NoteModel } from '../../../Shared/Models/note.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: '[note-list]',
	templateUrl: 'note-list.component.html',
	styleUrls: ['../notes.component.css'],
	encapsulation: ViewEncapsulation.None
})


export class NoteListComponent implements OnInit {
	@Input() result: ReplaySubject<LoadingModel>;
	@Input() notes: NoteModel[];
	@Output() loadNote: EventEmitter<NoteModel> = new EventEmitter<NoteModel>()

	constructor() {

	}

	noteSelected(note: NoteModel, event: Event) {
		event.preventDefault();
		this.loadNote.emit(note);
	}

	ngOnInit() {
		// this.result.subscribe(
		// 	(result: LoadingModel) => {
		// 		if (result.isSuccess) {
		// 		}
		// 	}
		// )
	}
}