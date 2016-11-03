import { Subject, Observable } from 'rxjs';
import { TimeInterval } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';
import { FlashMessageService } from './flash-message.service';
import { FlashMessage } from './flash-message';

@Component({
	selector: 'flash-message',
	templateUrl: 'flash-message.component.html',
	styleUrls: ['flash-message.component.css']
})

export class FlashMessageComponent implements OnInit {
	flashMessage: Subject<FlashMessage>;
	timer: Observable<number>;

	constructor(private flashMessageService: FlashMessageService) {

		this.flashMessage = new Subject<FlashMessage>();
		this.flashMessageService.getMessages().subscribe(
			flashMessage => {
				this.flashMessage.next(flashMessage);
				if (flashMessage.duration > 0) {
					this.timer = Observable.interval(flashMessage.duration / 100).take(101).finally(() => this.hide());
				}
			},
			err => err,
			() => this.hide()
		)
	}

	ngOnInit() {

	}

	hide(event?: Event) {
		if (event) {
			event.preventDefault();
		}
		this.timer = null;
		this.flashMessage.next(null);
		setTimeout(() => {
			this.flashMessageService.messageClosed();
		}, 90);
	}
}