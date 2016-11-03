import { NotesComponent } from './Notes/notes.component';
import { LoginRegisterComponent } from './LoginRegister/login-register.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserComponent } from './';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: 'user',
                component: UserComponent,
            }

        ]),
        RouterModule.forChild([
            {
                path: 'user',
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: '/user/login',
                    },
                    {
                        path: 'login',
                        component: LoginRegisterComponent,
                    },
                    {
                        path: 'notes',
                        component: NotesComponent,

                    }
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class UserRoutingModule { }
