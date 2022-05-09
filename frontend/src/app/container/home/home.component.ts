import {Component, OnInit} from '@angular/core';
import {AppState} from '../../ngrx/ngrx-models';
import {Store} from '@ngrx/store';
import {logoutUser} from '../../ngrx/action/user.actions';
import {User} from '../../models';
import {selectUser} from '../../ngrx/selector/user.selectors';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public user$: Observable<User> = this.store.select(selectUser);

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
  }

  signOut(): void {
    this.store.dispatch(logoutUser());
  }

}
