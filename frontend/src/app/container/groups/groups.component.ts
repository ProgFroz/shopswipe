import {Component, OnInit} from '@angular/core';
import {AppState} from '../../ngrx/ngrx-models';
import {Store} from '@ngrx/store';
import {createGroup, deleteGroup, generateNewLink, kickMember, leaveGroup, promoteOwner} from '../../ngrx/action/groups.actions';
import {Observable} from 'rxjs';
import {Group, User} from '../../models';
import {selectUser} from '../../ngrx/selector/user.selectors';
import {selectGenerateNewLinkLoading, selectGroup, selectGroupLoading} from '../../ngrx/selector/groups.selectors';
import {updateUserGroupID} from '../../ngrx/action/user.actions';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  public user$: Observable<User> = this.store.select(selectUser);
  public group$: Observable<Group> = this.store.select(selectGroup);
  public groupLoading$: Observable<boolean> = this.store.select(selectGroupLoading);
  public generateNewLinkLoading$: Observable<boolean> = this.store.select(selectGenerateNewLinkLoading);

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
  }

  createGroup(holder: any): void {
    this.store.dispatch(createGroup({name: holder.name, owner: holder.owner}));
  }

  removeGroupId($event: any): void {
    this.store.dispatch(kickMember({uid: $event.uid, gid: $event.gid}));
  }

  generateNewLink(gid: string): void {
    this.store.dispatch(generateNewLink({gid}));
  }

  deleteGroup(gid: string): void {
    this.store.dispatch(deleteGroup({gid}));
  }

  promoteOwner($event: any): void {
    this.store.dispatch(promoteOwner({gid: $event.gid, uid: $event.uid}));
  }

  leaveGroup(uid: string): void {
    this.store.dispatch(leaveGroup({uid}));
  }
}
