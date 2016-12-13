import { Subject, Observable } from 'rxjs';
import { TimeInterval } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';
import { FlashMessageService } from './flash-message.service';
import { FlashMessage } from './flash-message';

/**
 * Displays flash messages from the flash message service
 * 
 * @export
 * @class FlashMessageComponent
 * @implements {OnInit}
 */
@Component({
	selector: 'flash-message',
	templateUrl: 'flash-message.component.html',
	styleUrls: ['flash-message.component.css']
})

export class FlashMessageComponent implements OnInit {
	// Current flashMessage to display
	flashMessage: Subject<FlashMessage>;
	timer: Observable<number>;

	/**
	 * Creates an instance of FlashMessageComponent.
	 * 
	 * @param {FlashMessageService} flashMessageService
	 * 
	 * @memberOf FlashMessageComponent
	 */
	constructor(private flashMessageService: FlashMessageService) {

		this.flashMessage = new Subject<FlashMessage>();
		// Displays flash messages emited from stream		
		this.flashMessageService.getMessages().subscribe(
			flashMessage => {
				// Emit current flash message to view
				this.flashMessage.next(flashMessage);
				if (flashMessage.duration > 0) {
					this.timer = Observable.interval(flashMessage.duration / 100).take(101).finally(() => this.hide(null, flashMessage.callbackFn));
				}
			},
			err => err,
			() => this.hide()
		);
	}

	/**
	 * 
	 * 
	 * 
	 * @memberOf FlashMessageComponent
	 */
	ngOnInit() {

	}

	/**
	 * Hides the flash message either on clickor after a set duration
	 * 
	 * @param {Event} [event] click event from view
	 * @param {() => void} [callbackFn] callback function to invoke
	 * 
	 * @memberOf FlashMessageComponent
	 */
	hide(event?: Event, callbackFn?: () => void) {
		if (event) {
			event.preventDefault();
		}
		this.timer = null;
		this.flashMessage.next(null);
		setTimeout(() => {
			this.flashMessageService.messageClosed();
		}, 90);
		if (callbackFn) {
			callbackFn();
		}
	}
}
