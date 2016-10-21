import { Subject } from 'rxjs/Subject';
import { Component, OnInit } from '@angular/core';
import { FlashMessageService } from './flash-message.service';
import { FlashMessage } from './flash-message';

@Component({
	selector: 'flash-message',
	templateUrl: 'flash-message.component.html',
	styleUrls: ['flash-message.component.css']
})

export class FlashMessageComponent implements OnInit {
	show: boolean = false;
	flashMessage: Subject<FlashMessage>;

	constructor(private flashMessageService: FlashMessageService) {
		this.flashMessage = new Subject<FlashMessage>();
		this.flashMessageService.getMessages().subscribe(
			flashMessage => this.flashMessage.next(flashMessage),
			err => err,
			() => this.hide()
		)
	}

	ngOnInit() {

	}

	hide() {
		this.flashMessage.next(null);
	}
}