import { UsernameAvailability, UserLogin } from './Models/user.model';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { Injectable } from '@angular/core';
import { Http, Headers, ResponseType, Response } from '@angular/http';
import { AddUserModel } from './Models';

/**
 * Handles API interactions related to user-operations
 * 
 * @export
 * @class UserService
 */
@Injectable()
export class UserService {

    API_ENDPOINT = process.env.API_ENDPOINT;
    private _isAuthenticated: boolean = false;

    /**
     * Creates an instance of UserService.
     * 
     * @param {Http} http
     * 
     * @memberOf UserService
     */
    constructor(private http: Http) {
        this._isAuthenticated = localStorage.getItem('token') != null;

    }


    /**
     * Adds a new user 
     * 
     * @param {AddUserModel} newUser
     * @returns {Response} Http-response code for the result of the operation
     * 
     * @memberOf UserService
     */
    addUser(newUser: AddUserModel): Observable<Response> {
        return this.http.post(`${this.API_ENDPOINT}/users`, JSON.stringify(newUser))
            .map(response => response)
            .catch(err => Observable.throw(err['_body']));
    }


    /**
     * Atemptes to authorize supplied credentials against the API
     * Stores a jwt authorization token in localstorage on success
     * @param {UserLogin} user
     * @returns {Observable<Object>} jwt-authorization token
     * 
     * @memberOf UserService
     */
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

    /**
     * Destroys the jwt-authentication token
     * 
     * 
     * @memberOf UserService
     */
    logout() {
        localStorage.removeItem('token');
        this._isAuthenticated = false;
    }

    /**
     * 
     * @type {boolean}
     * @returns {boolean} If there's currently a user authenticated
     * @memberOf UserService
     */
    get isAuthenticated(): boolean {
        return this._isAuthenticated;
    }

    /**
     * 
     * @memberOf UserService
     */
    set isAuthenticated(isAuthenticated: boolean) {
        this._isAuthenticated = isAuthenticated;
    }

    /**
     * Checks if there's currently any user registered with the supplied username
     * 
     * @param {string} username
     * @returns {Observable<UsernameAvailability>}
     * 
     * @memberOf UserService
     */
    getUsernameAvailability(username: string): Observable<UsernameAvailability> {
        return this.http
            .get(`${this.API_ENDPOINT}/users/check-availability/${username}`)
            .map(response => <UsernameAvailability>response.json());


    }

}
