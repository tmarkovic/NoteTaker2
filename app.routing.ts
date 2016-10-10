import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AboutComponent } from './About/about.component';
import { HomeComponent } from './Home/home.component';
@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '', component: HomeComponent },
            { path: 'about', component: AboutComponent }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
