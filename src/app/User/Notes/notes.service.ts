import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { NoteModel } from '../../Shared/Models/note.model';

@Injectable()
export class NotesService {
    headers = new Headers();
    options = new RequestOptions();
    API_ENDPOINT = process.env.API_ENDPOINT;
    constructor(private http: Http) {
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('authentication-token', '');
        this.options.headers = this.headers;
    }

    createNote(note: NoteModel): Observable<NoteModel> {
        this.headers.set('authentication-token', localStorage.getItem('token'));
        if (note.title == null) {
            let array = new Uint32Array(1);
            note.title = 'EmptyTitle' + window.crypto.getRandomValues(array)[0];
        }
        return this.http.post(`${this.API_ENDPOINT}/notes`, JSON.stringify({ "noteData": { "title": note.title, "text": note.text, "color": note.color } }), this.options)
            .map(res => <NoteModel>res.json());
    }

    getNote(noteId: string): Observable<NoteModel> {
        this.headers.set('authentication-token', localStorage.getItem('token'));
        return this.http.get(`${this.API_ENDPOINT}/notes/${noteId}`, this.options).map(res => <NoteModel>res.json());
    }

    getNotes(): Observable<NoteModel[]> {
        this.headers.set('authentication-token', localStorage.getItem('token'));
        return this.http.get(`${this.API_ENDPOINT}/notes`, this.options).map(res => <NoteModel[]>res.json());
    }

    updateNote(note: NoteModel): Observable<NoteModel> {
        this.headers.set('authentication-token', localStorage.getItem('token'));
        return this.http.put(`${this.API_ENDPOINT}/notes/${note.id}`, JSON.stringify({ "noteData": note }), this.options).map(res => <NoteModel>res.json());
    }

    deleteNote(note: NoteModel): Observable<NoteModel> {
        this.headers.set('authentication-token', localStorage.getItem('token'));
        return this.http.delete(`${this.API_ENDPOINT}/notes/${note.id}`, this.options).map(res => <NoteModel>res.json());
    }

}