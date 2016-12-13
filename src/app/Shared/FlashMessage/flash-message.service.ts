import { Observable } from 'rxjs/Observable';
import { FlashMessage } from './flash-message';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

/**
 * Coordinates flash messages 
 * 
 * @export
 * @class FlashMessageService
 */
@Injectable()
export class FlashMessageService {
    private showMessage$: Subject<FlashMessage>;
    private showNext$: Subject<any>;
    private messages: FlashMessage[];
    
    /**
     * Creates an instance of FlashMessageService.
     * 
     * 
     * @memberOf FlashMessageService
     */
    constructor() {
        this.messages = new Array<FlashMessage>();
        this.showNext$ = new Subject<any>();
        this.showMessage$ = new Subject<FlashMessage>();
    }

    /**
     * Shows a new flash message if there's no flashmessage in queue
     * 
     * 
     * @memberOf FlashMessageService
     */
    showMessage = (message: FlashMessage) => {
        if (this.messages.length === 0) {
            this.messages.push(message);
            this.showMessage$.next(message);
        } else {
            this.messages.push(message);
        }


    }
    /**
     * Callback function invoked when a message is closed
     * 
     * 
     * @memberOf FlashMessageService
     */
    messageClosed() {
        this.messages.shift();
        if (this.messages.length > 0) {
            this.showMessage$.next(this.messages[0]);
        }
    }
    /**
     * Returns a stream of currently queued flash messages
     * 
     * @returns {Observable<FlashMessage>}
     * 
     * @memberOf FlashMessageService
     */
    getMessages(): Observable<FlashMessage> {
        return this.showMessage$.asObservable();
    }
}

