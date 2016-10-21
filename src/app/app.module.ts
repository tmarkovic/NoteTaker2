import { ValidationModule } from './Shared/Validation/validation.module';
import { AboutComponent } from './About/about.component';
import { NavigationComponent } from './Shared';
import { HomeComponent } from './Home/home.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { UserModule } from './User';
import { FormsModule } from '@angular/forms';
import { FlashMessageModule } from './Shared/FlashMessage/';

@NgModule({
    imports: [
        BrowserModule,
        UserModule,
        AppRoutingModule,
        FormsModule,
        ValidationModule,
        FlashMessageModule
    ],
    exports: [BrowserModule],
    declarations: [AppComponent, HomeComponent, NavigationComponent, AboutComponent],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }
