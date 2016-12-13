import { UsernameAvailability, UserLogin } from './Models/user.model';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { ErrorModel } from './../Shared/Models/error.model';
import { Injectable } from '@angular/core';
import { Http, Headers, ResponseType } from '@angular/http';
import { AddUserModel } from './Models';

@Injectable()
export class UserService {
    API_ENDPOINT = process.env.API_ENDPOINT;
    private _isAuthenticated: boolean = false;

    constructor(private http: Http) {
        this._isAuthenticated = localStorage.getItem('token') != null;

    }


    addUser(newUser: AddUserModel) {
        return this.http.post(`${this.API_ENDPOINT}/users`, JSON.stringify(newUser))
            .map(response => response)
            .catch(err => Observable.throw(err['_body']));
    }


    authenticateUser(user: UserLogin): Observable<Object> {
        return new Observable((obs: Observer<Object>) => {
            this.http.post(`${this.API_ENDPOINT}/login`, JSON.stringify(user))
                .map(res => res.text())
                .subscribe(res => {
                    localStorage.setItem('token', res);
                    this.isAuthenticated = true;
                    obs.next({ success: true });
                },
                (error) => {
                    obs.error({ success: false });
                },
                () => {
                    obs.complete();
                });
        });
    }

    logout() {
        localStorage.removeItem('token');
        this._isAuthenticated = false;
    }

    get isAuthenticated(): boolean {
        return this._isAuthenticated;
    }

    set isAuthenticated(isAuthenticated: boolean) {
        this._isAuthenticated = isAuthenticated;
    }

    getUsernameAvailability(username: string): Observable<UsernameAvailability> {
        return this.http
            .get(`${this.API_ENDPOINT}/users/check-availability/${username}`)
            .map(response => <UsernameAvailability>response.json());


    }

}      