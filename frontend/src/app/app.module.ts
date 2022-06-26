import {BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig} from '@angular/platform-browser';
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
import { GroupsComponent } from './container/groups/groups.component';
import { GroupsP12lComponent } from './presentational/groups-p12l/groups-p12l.component';
import {ReactiveFormsModule} from '@angular/forms';
import {GroupsEffects} from './ngrx/effect/groups.effects';
import { JoinGroupComponent } from './container/join-group/join-group.component';
import { JoinGroupP12lComponent } from './presentational/join-group-p12l/join-group-p12l.component';
import { ShoppingComponent } from './container/shopping/shopping.component';
import { ShoppingP12lComponent } from './presentational/shopping-p12l/shopping-p12l.component';
import {ShoppingEffects} from './ngrx/effect/shopping.effects';
import * as Hammer from 'hammerjs';
import { HammerModule } from '@angular/platform-browser';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { FinancesComponent } from './container/finances/finances.component';
import { FinancesP12lComponent } from './presentational/finances-p12l/finances-p12l.component';
import {FinancesEffects} from './ngrx/effect/finances.effects';
import {MatTabsModule} from '@angular/material/tabs';
import { HelpComponent } from './container/help/help.component';
import { HelpP12lComponent } from './presentational/help-p12l/help-p12l.component';

firebase.initializeApp(environment.config);
export class HammerConfig extends HammerGestureConfig {
  overrides = {
    swipe: { enabled: false },
    pan: { direction: Hammer.DIRECTION_HORIZONTAL },
  };
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginP12lComponent,
    HomeP12lComponent,
    HomeComponent,
    GroupsComponent,
    GroupsP12lComponent,
    JoinGroupComponent,
    JoinGroupP12lComponent,
    ShoppingComponent,
    ShoppingP12lComponent,
    FinancesComponent,
    FinancesP12lComponent,
    HelpComponent,
    HelpP12lComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.config),
    HttpClientModule,
    BrowserModule,
    ClarityModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    EffectsModule.forRoot([UserEffects, GroupsEffects, ShoppingEffects, FinancesEffects]),
    StoreRootModule,
    StoreModule.forRoot(globalReducers, {}),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    HammerModule,
    DragDropModule,
    MatTabsModule

  ],
  providers: [{ provide: LOCALE_ID, useValue: 'de-DE'}, {provide: HAMMER_GESTURE_CONFIG, useClass: HammerConfig}],
  bootstrap: [AppComponent]
})
export class AppModule { }
