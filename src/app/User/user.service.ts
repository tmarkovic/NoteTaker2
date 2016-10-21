import { UsernameAvailability, UserLogin } from './Models/user.model';
import { Observable } from 'rxjs/Observable';
import { ErrorModel } from './../Shared/Models/error.model';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AddUserModel } from './Models';

@Injectable()
export class UserService {
    baseUri: string = "http://localhost:4500/api/";
    baseHeaders: Headers = new Headers();

    constructor(private http: Http) {
        this.baseHeaders.append('Content-Type', 'application/json');

    }


    addUser(newUser: AddUserModel) {
        return this.http.post(`${this.baseUri}users`, JSON.stringify(newUser), { headers: this.baseHeaders })
            .map(response => response)
            .catch(err => Observable.throw(err['_body']));
    }


    authenticateUser(user: UserLogin) {
        return this.http.post(`${this.baseUri}login`, JSON.stringify(user), { headers: this.baseHeaders })
            .map(response => response)
            .catch(err => Observable.throw(err['_body']));
    }

    getUsernameAvailability(username: string) {
        return this.http
            .get(`${this.baseUri}/users/check-availability/${username}`, { headers: this.baseHeaders })
            .map(response => <UsernameAvailability>response.json());      


    }

}      