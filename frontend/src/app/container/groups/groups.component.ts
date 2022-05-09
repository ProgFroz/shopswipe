import {Component, OnInit} from '@angular/core';
import {AppState} from '../../ngrx/ngrx-models';
import {Store} from '@ngrx/store';
import {createGroup} from '../../ngrx/action/groups.actions';
import {Observable} from 'rxjs';
import {Group, User} from '../../models';
import {selectUser} from '../../ngrx/selector/user.selectors';
import {selectGroup, selectGroupLoading} from '../../ngrx/selector/groups.selectors';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  public user$: Observable<User> = this.store.select(selectUser);
  public group$: Observable<Group> = this.store.select(selectGroup);
  public groupLoading$: Observable<boolean> = this.store.select(selectGroupLoading);

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
  }

  createGroup(holder: any): void {
    this.store.dispatch(createGroup({name: holder.name, owner: holder.owner}));
  }
}
