import { FlashMessage } from './flash-message';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

@Injectable()
export class FlashMessageService {
    private showMessage$: Subject<FlashMessage>;
    constructor() {
        this.showMessage$ = new Subject<FlashMessage>();
    }

    showMessage = (message: FlashMessage) => {
        setTimeout(() => {
            this.showMessage$.next(message);

        }, 300)
        if (message.duration > 0) {
            setTimeout(() => {
                this.showMessage$.complete();
            }, message.duration);
        }


    }

    getMessages(): Subject<FlashMessage> {
        return this.showMessage$;
    }
}