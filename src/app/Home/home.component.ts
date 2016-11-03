import { FlashMessageService } from './../Shared/FlashMessage/flash-message.service';
import { Component, OnInit } from '@angular/core';
import { FlashMessage, FlashMessageType } from './../Shared/FlashMessage/flash-message';

@Component({
    selector: 'home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {
    constructor(private flashMessageService: FlashMessageService) {

    }

    ngOnInit() {
    }
}