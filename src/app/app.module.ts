import { AboutComponent } from './About/about.component';
import { NavigationComponent } from './Shared';
import { HomeComponent } from './Home/home.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { UserModule } from './User';

@NgModule({
    imports: [
        BrowserModule,
        UserModule,
        AppRoutingModule,
    ],
    declarations: [AppComponent, HomeComponent, NavigationComponent, AboutComponent],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }
