import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { NoteModel } from '../../Shared/Models/note.model';

/**
 * Handles API interactions related to note-operations
 * 
 * @export
 * @class NotesService
 */
@Injectable()
export class NotesService {

    headers = new Headers();
    options = new RequestOptions();
    API_ENDPOINT = process.env.API_ENDPOINT;

    /**
     * Creates an instance of NotesService.
     * 
     * @param {Http} http
     * 
     * @memberOf NotesService
     */
    constructor(private http: Http) {
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('authentication-token', '');
        this.options.headers = this.headers;
    }

    /**
     * Posts a new note to the api
     * 
     * @param {NoteModel} note
     * @returns {Observable<NoteModel>}
     * 
     * @memberOf NotesService
     */
    createNote(note: NoteModel): Observable<NoteModel> {
        this.headers.set('authentication-token', localStorage.getItem('token'));
        if (note.title == null) {
            let array = new Uint32Array(1);
            note.title = 'EmptyTitle' + window.crypto.getRandomValues(array)[0];
        }
        return this.http.post(
            `${this.API_ENDPOINT}/notes`, JSON.stringify({ 'noteData': { 'title': note.title, 'text': note.text, 'color': note.color } }), this.options)
            .map(res => <NoteModel>res.json()
            );
    }

    /**
     * Retrieves a specific note by the supplied noteId
     * 
     * @param {string} noteId
     * @returns {Observable<NoteModel>}
     * 
     * @memberOf NotesService
     */
    getNote(noteId: string): Observable<NoteModel> {
        this.headers.set('authentication-token', localStorage.getItem('token'));
        return this.http.get(`${this.API_ENDPOINT}/notes/${noteId}`, this.options).map(res => <NoteModel>res.json());
    }

    /**
     * Retrieves a list of notes belonging to a specific user
     * 
     * @returns {Observable<NoteModel[]>}
     * 
     * @memberOf NotesService
     */
    getNotes(): Observable<NoteModel[]> {
        this.headers.set('authentication-token', localStorage.getItem('token'));
        return this.http.get(`${this.API_ENDPOINT}/notes`, this.options).map(res => <NoteModel[]>res.json());
    }

    /**
     * Updates a specific note 
     * 
     * @param {NoteModel} note
     * @returns {Observable<NoteModel>}
     * 
     * @memberOf NotesService
     */
    updateNote(note: NoteModel): Observable<NoteModel> {
        this.headers.set('authentication-token', localStorage.getItem('token'));
        return this.http.put(
            `${this.API_ENDPOINT}/notes/${note.id}`, JSON.stringify({ 'noteData': note }), this.options).map(res => <NoteModel>res.json()
            );
    }

    /**
     * Deletes a specific note
     * 
     * @param {NoteModel} note
     * @returns {Observable<NoteModel>}
     * 
     * @memberOf NotesService
     */
    deleteNote(note: NoteModel): Observable<NoteModel> {
        this.headers.set('authentication-token', localStorage.getItem('token'));
        return this.http.delete(`${this.API_ENDPOINT}/notes/${note.id}`, this.options).map(res => <NoteModel>res.json());
    }

}
