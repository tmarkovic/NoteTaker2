import { NotesModule } from './Notes/notes.module';
import { LoginRegisterComponent } from './LoginRegister/login-register.component';
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
    imports: [
        HttpModule,
        UserRoutingModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        ValidationModule,
        NotesModule
    ],
    exports: [UserComponent],
    declarations: [
        RegisterComponent,
        LoginComponent,
        UserComponent,
        TabsComponent,
        TabComponent,
        LoginRegisterComponent
    ],
    providers: [UserService],
})
export class UserModule { }


