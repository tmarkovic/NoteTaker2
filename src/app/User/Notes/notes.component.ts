import { LoadingModel } from './../../Shared/Models/loading.model';
import { ReplaySubject } from 'rxjs';
import { FlashMessageService } from './../../Shared/FlashMessage/flash-message.service';
import { FlashMessage, FlashMessageType } from './../../Shared/FlashMessage/flash-message';

import { NotesService } from './notes.service';
import { NoteModel } from './../../Shared/Models/note.model';
import { Component, OnInit } from '@angular/core';

/**
 * Container class for the notes page
 * Responsible for supplying subscribing components
 * with data and acts on received events
 * f
 * @export
 * @class NotesComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'notes',
    templateUrl: 'notes.component.html',
    styleUrls: ['./notes.component.css']
})


export class NotesComponent implements OnInit {

    // TODO: Refactor into single intent subject
    createNoteResult: ReplaySubject<LoadingModel>;
    updateNoteResult: ReplaySubject<LoadingModel>;
    deleteNoteResult: ReplaySubject<LoadingModel>;
    currentNote: ReplaySubject<NoteModel>;
    noteList: NoteModel[];
    loading: LoadingModel = {
        isLoading: true,
        isSuccess: false
    };
    /**
     * Creates an instance of NotesComponent.
     * 
     * @param {NotesService} notesService
     * @param {FlashMessageService} flashMessageService
     * 
     * @memberOf NotesComponent
     */
    constructor(private notesService: NotesService, private flashMessageService: FlashMessageService) {
        this.createNoteResult = new ReplaySubject<LoadingModel>();
        this.updateNoteResult = new ReplaySubject<LoadingModel>();
        this.deleteNoteResult = new ReplaySubject<LoadingModel>();

        this.currentNote = new ReplaySubject<NoteModel>();

        this.notesService.getNotes().subscribe(res => this.noteList = res);

    }

    /**
     * 
     * 
     * 
     * @memberOf NotesComponent
     */
    ngOnInit() { }

    /**
     * Atemptes to create a new note 
     * and let subscribing components know of the result
     * 
     * @param {NoteModel} note
     * 
     * @memberOf NotesComponent
     */
    createNote(note: NoteModel) {
        this.loading = new LoadingModel();
        this.createNoteResult.next(this.loading);
        this.notesService.createNote(note).subscribe(value => {
            this.loading.isLoading = false;
            this.loading.isSuccess = true;
            this.noteList.push(value);
            this.flashMessageService.showMessage(
                new FlashMessage(FlashMessageType.SUCCES, `Note: ${note.title} was successfuly created!`, 1500)
            );
            this.createNoteResult.next(this.loading);
        });
    }

    /**
     * Tries to retrieve a specific note 
     * and push it to subscribing components
     * @param {NoteModel} note
     * 
     * @memberOf NotesComponent
     */
    getNote(note: NoteModel) {
        this.currentNote.next(note);
        this.notesService.getNote(note.id).subscribe(

            n => {
                this.currentNote.next(n);
            },
            err => this.currentNote.error(err)

        );
    }

    /**
     * Tries to update a specific note
     * 
     * @param {NoteModel} note
     * 
     * @memberOf NotesComponent
     */
    updateNote(note: NoteModel) {
        this.loading = new LoadingModel();
        this.updateNoteResult.next(this.loading);
        this.notesService.updateNote(note).subscribe(updatedNote => {
            this.loading.isLoading = false;
            this.loading.isSuccess = true;
            this.flashMessageService.showMessage(
                new FlashMessage(FlashMessageType.SUCCES, `Note: ${note['_sourceData'].title} was successfuly updated!`, 1500)
            );
            this.noteList[this.noteList.findIndex(n => n.id === updatedNote.id)] = updatedNote;
            this.updateNoteResult.next(this.loading);
        },
            err => {
                this.loading.error = err;
                this.loading.isSuccess = false;
                this.updateNoteResult.next(this.loading);
            }
        );

    }


    /**
     * Tries to delete a specific note
     * and update subscribing components
     * @param {NoteModel} note
     * 
     * @memberOf NotesComponent
     */
    deleteNote(note: NoteModel) {
        this.loading = new LoadingModel();
        this.deleteNoteResult.next(this.loading);
        this.notesService.deleteNote(note).subscribe(deletedNote => {
            this.loading.isLoading = false;
            this.loading.isSuccess = true;
            this.flashMessageService.showMessage(
                new FlashMessage(FlashMessageType.SUCCES, `Note: ${note['_sourceData'].title} was successfuly deleted!`, 1500)
            );

            let targetNote = this.noteList.findIndex(n => n.id === deletedNote.id);
            this.noteList.splice(targetNote, 1);
            if (targetNote > 0) {
                this.getNote(this.noteList[targetNote - 1]);
            } else {
                this.currentNote.next(null);
            }
            this.deleteNoteResult.next(this.loading);
        },
            err => {
                this.loading.error = err;
                this.loading.isSuccess = false;
                this.flashMessageService.showMessage(
                    new FlashMessage(FlashMessageType.ERROR, `Note: ${note['_sourceData'].title} could not be deleted!`, 1500)
                );
                this.deleteNoteResult.next(this.loading);
            }
        );

    }
}
