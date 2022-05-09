import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppState} from '../../ngrx/ngrx-models';
import {Store} from '@ngrx/store';
import {loadGroupByCode} from '../../ngrx/action/groups.actions';
import {Observable} from 'rxjs';
import {Group, User} from '../../models';
import {selectInvitedGroup, selectInvitedGroupLoading} from '../../ngrx/selector/groups.selectors';
import {selectUser} from '../../ngrx/selector/user.selectors';
import {updateUserGroupID} from '../../ngrx/action/user.actions';

@Component({
  selector: 'app-join-group',
  templateUrl: './join-group.component.html',
  styleUrls: ['./join-group.component.css']
})
export class JoinGroupComponent implements OnInit {

  public user$: Observable<User> = this.store.select(selectUser);
  public invitedGroup$: Observable<Group> = this.store.select(selectInvitedGroup);
  public invitedGroupLoading$: Observable<boolean> = this.store.select(selectInvitedGroupLoading);

  constructor(public route: ActivatedRoute, private store: Store<AppState>, private router: Router) {
    this.route.params.subscribe(params => {
      if (params && params.code) {
        this.store.dispatch(loadGroupByCode({code: params.code}));
      }
    });
  }

  ngOnInit(): void {

  }

  joinGroup($event: any): void {
    this.store.dispatch(updateUserGroupID({uid: $event.uid, gid: $event.gid}));
    this.redirect();
  }

  redirect(): void {
    this.router.navigate(['home/groups']);
  }
}
