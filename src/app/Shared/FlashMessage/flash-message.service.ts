import { Observable } from 'rxjs/Observable';
import { FlashMessage } from './flash-message';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

@Injectable()
export class FlashMessageService {
    private showMessage$: Subject<FlashMessage>;
    private showNext$: Subject<any>;
    private messages: FlashMessage[];
    constructor() {
        this.messages = new Array<FlashMessage>();
        this.showNext$ = new Subject<any>();
        this.showMessage$ = new Subject<FlashMessage>();
    }

    showMessage = (message: FlashMessage) => {
        if (this.messages.length === 0) {
            this.messages.push(message);
            this.showMessage$.next(message);
        } else {
            this.messages.push(message);
        }


    }
    messageClosed() {
        this.messages.shift();
        if (this.messages.length > 0) {
            this.showMessage$.next(this.messages[0]);
        }
    }
    getMessages(): Observable<FlashMessage> {
        return this.showMessage$.asObservable();
    }
}