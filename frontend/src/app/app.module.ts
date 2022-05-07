import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import {environment} from '../environments/environment';
// @ts-ignore
import firebase from 'firebase';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './container/login/login.component';
import { LoginP12lComponent } from './presentational/login-p12l/login-p12l.component';
import { HomeP12lComponent } from './presentational/home-p12l/home-p12l.component';
import { HomeComponent } from './container/home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import {StoreModule, StoreRootModule} from '@ngrx/store';
import {globalReducers} from './ngrx/ngrx-models';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {AngularFireModule} from '@angular/fire';
import {HttpClientModule} from '@angular/common/http';
import {UserEffects} from './ngrx/effect/user.effects';
import {ClarityModule} from '@clr/angular';

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
    AngularFireModule.initializeApp(environment.config),
    HttpClientModule,
    BrowserModule,
    ClarityModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    EffectsModule.forRoot([UserEffects]),
    StoreRootModule,
    StoreModule.forRoot(globalReducers, {}),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'de-DE'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
