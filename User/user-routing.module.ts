import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserComponent } from './';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: 'user', component: UserComponent }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class UserRoutingModule { }
