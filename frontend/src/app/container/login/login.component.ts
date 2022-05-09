import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../ngrx/ngrx-models';
import {googleLogin} from '../../ngrx/action/user.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
  }

  googleSignIn(b: boolean): void {
    this.store.dispatch(googleLogin());
  }

}
