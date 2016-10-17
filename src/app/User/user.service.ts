import { UsernameAvailability } from './Models/user.model';
import { Observable } from 'rxjs/Observable';
import { ErrorModel } from './../Shared/Models/error.model';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AddUserModel } from './Models';

@Injectable()
export class UserService {
    baseUri: string = "http://localhost:4500/api/";
    baseHeaders: Headers;
    constructor(private http: Http) {

    }


    addUser(newUser: AddUserModel) {
        let headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(`${this.baseUri}users`, JSON.stringify(newUser), { headers })
            .map(response => response)
            .catch(err => Observable.throw(err['_body']));
    }

    getUsernameAvailability(username: string) {
        let headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
        .get(`${this.baseUri}/users/check-availability/${username}`, { headers })
        .map(response => <UsernameAvailability>response.json());


    }

}