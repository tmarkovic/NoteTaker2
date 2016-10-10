import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { UserRoutingModule } from './';
import { NotesComponent } from './';
import { RegisterComponent } from './';
import { LoginComponent } from './';
import { UserComponent } from './';



@NgModule({
    imports: [HttpModule, UserRoutingModule],
    exports: [UserComponent],
    declarations: [NotesComponent, RegisterComponent, LoginComponent, UserComponent],
    providers: [],
})
export class UserModule { }
