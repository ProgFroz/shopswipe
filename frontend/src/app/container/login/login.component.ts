import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../ngrx/ngrx-models';
import {googleLogin} from '../../ngrx/action/user.actions';
import firebase from 'firebase';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private store: Store<AppState>, private router: Router) {
  }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.router.navigate(['home']);
      }
    });
  }

  googleSignIn(b: boolean): void {
    this.store.dispatch(googleLogin());
  }

}
