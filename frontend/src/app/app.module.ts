import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {environment} from '../environments/environment';
import firebase from 'firebase/compat';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './container/login/login.component';
import { LoginP12lComponent } from './presentational/login-p12l/login-p12l.component';
import { HomeP12lComponent } from './presentational/home-p12l/home-p12l.component';
import { HomeComponent } from './container/home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from '@angular/router';

firebase.initializeApp(environment.config);
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginP12lComponent,
    HomeP12lComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    ClarityModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
