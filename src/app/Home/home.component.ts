import { FlashMessageService } from './../Shared/FlashMessage/flash-message.service';
import { Component, OnInit } from '@angular/core';
import { FlashMessage } from './../Shared/FlashMessage/flash-message';

@Component({
    selector: 'home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {
    constructor(private flashMessageService: FlashMessageService) {

    }

    ngOnInit() {
        this.flashMessageService.showMessage(
            <FlashMessage>{
                type: 'is-success',
                duration: 0,
                message: 'message'
            });
    }
}