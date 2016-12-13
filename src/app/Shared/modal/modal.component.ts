import {
	Component, OnInit, Input, Output, EventEmitter, trigger,
	state,
	style,
	transition,
	animate
} from '@angular/core';
import { Observable } from 'rxjs/observable';

@Component({
	selector: 'modal',
	templateUrl: 'modal.component.html',
	animations: [
		trigger('flyIn', [
			state('in', style({ transform: 'translateX(0)' })),
			transition('void => *', [
				style({ transform: 'translateX(-100%)' }),
				animate(100)
			]),
			transition('* => void', [
				animate(100, style({ transform: 'translateX(100%)' }))
			])
		])
	]
})

export class ModalComponent implements OnInit {

	@Input() toggleModal: boolean;
	@Output('closeModal') closeModalEvt: EventEmitter<boolean> = new EventEmitter<boolean>();

	closeModal() {
		this.closeModalEvt.emit(true);
	}
	ngOnInit() { }
}