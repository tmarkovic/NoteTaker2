import { FlashMessageService } from './../Shared/FlashMessage/flash-message.service';
import { Component, OnInit } from '@angular/core';
import { FlashMessage, FlashMessageType } from './../Shared/FlashMessage/flash-message';

/**
 * Class for the home page
 * 
 * @export
 * @class HomeComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {
    /**
     * Creates an instance of HomeComponent.
     * 
     * @param {FlashMessageService} flashMessageService
     * 
     * @memberOf HomeComponent
     */
    constructor(private flashMessageService: FlashMessageService) {

    }

    /**
     * 
     * 
     * 
     * @memberOf HomeComponent
     */
    ngOnInit() {
    }
}
