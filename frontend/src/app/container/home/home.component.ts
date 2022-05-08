import {Component, OnInit} from '@angular/core';
import {AppState} from '../../ngrx/ngrx-models';
import {Store} from '@ngrx/store';
import {logoutUser} from '../../ngrx/action/user.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
  }

  signOut(): void {
    this.store.dispatch(logoutUser());
  }

}
