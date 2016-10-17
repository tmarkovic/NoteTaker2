import { UserModule } from './../../User/user.module';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ValidationComponent } from './validation.component';
import { ValidationService } from './validation.service';

@NgModule({
    imports: [BrowserModule, FormsModule],
    exports: [ValidationComponent],
    declarations: [ValidationComponent],
    providers: [ValidationService],
})
export class ValidationModule { }
