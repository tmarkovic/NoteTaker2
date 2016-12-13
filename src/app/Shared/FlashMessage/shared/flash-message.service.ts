import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { FlashMessage } from './flash-message.model';

@Injectable()
export class FlashMessageService {

	constructor(private http: Http) { }

	getList(): Observable<FlashMessage[]> {
		return this.http.get('/api/list').map(res => res.json() as FlashMessage[]);
	}
}