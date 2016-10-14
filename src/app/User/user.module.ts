import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { UserRoutingModule } from './';
import { NotesComponent } from './';
import { RegisterComponent } from './';
import { LoginComponent } from './';
import { UserComponent } from './';
import { TabsComponent, TabComponent } from '../Shared';
import { UserService } from './user.service';
import { ValidationModule } from '../Shared/Validation/validation.module';
import { ValidationComponent } from '../Shared/Validation/validation.component';





@NgModule({
    imports: [HttpModule, UserRoutingModule, BrowserModule, FormsModule, ReactiveFormsModule, ValidationModule],
    exports: [UserComponent],
    declarations: [NotesComponent, RegisterComponent, LoginComponent, UserComponent, TabsComponent, TabComponent],
    providers: [UserService],
})
export class UserModule { }


