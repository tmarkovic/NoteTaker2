import { Headers } from '@angular/http';
export abstract class BaseService {
    baseUri: string = 'http://localhost:4500/api';
    headers: Headers = new Headers();
    constructor() {
        this.headers.append('Content-Type', 'application/json');
    }



}