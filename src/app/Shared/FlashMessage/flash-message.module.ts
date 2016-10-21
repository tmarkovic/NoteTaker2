import { FlashMessageService } from './flash-message.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FlashMessageComponent } from './flash-message.component';

@NgModule({
    imports: [CommonModule],
    exports: [FlashMessageComponent],
    declarations: [FlashMessageComponent],
    providers: [FlashMessageService],
})
export class FlashMessageModule { }
