import { Component } from '@angular/core';
// @ts-ignore
import firebase from 'firebase';
import {AppState} from './ngrx/ngrx-models';
import {Store} from '@ngrx/store';
import {loadUser} from './ngrx/action/user.actions';
import {Router} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'shopswipe';

  constructor(private store: Store<AppState>, private router: Router) {
    firebase.auth().onAuthStateChanged((u) => {
      if (u) {
        console.log(u);
        this.store.dispatch(loadUser({uid: u.uid, email: u.email, imageUrl: u.photoURL, username: u.displayName}));
      } else {
        this.router.navigate(['login']);
      }
    });
  }
}
