import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {catchError, map, switchMap} from 'rxjs/operators';
import {from, of} from 'rxjs';
import {loadUserSuccess, updateUserGroupID} from '../action/user.actions';
import {RestClientService} from '../../rest-client.service';
import {Router} from '@angular/router';
import {
  createGroup,
  createGroupFailure,
  createGroupSuccess,
  deleteGroup,
  deleteGroupFailure,
  deleteGroupSuccess,
  generateNewLink,
  generateNewLinkFailure,
  kickMember,
  kickMemberFailure, leaveGroup, leaveGroupFailure,
  loadGroup,
  loadGroupByCode,
  loadGroupByCodeSuccess,
  loadGroupFailure,
  loadGroupMembers,
  loadGroupMembersFailure,
  loadGroupMembersSuccess,
  loadGroupSuccess, loadGroupWasNull, promoteOwner, promoteOwnerFailure, promoteOwnerSuccess
} from '../action/groups.actions';
import {GroupsHelper} from '../../util/groups.helper';

@Injectable()
export class GroupsEffects {
  createGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createGroup),
      switchMap((props) => from(this.restClientService.createGroup(props.name, props.owner)).pipe(
        map(group => {
          loadGroupSuccess({group});
          return createGroupSuccess({group});
        }),
        catchError((err) => of(createGroupFailure({httpError: err})))
      ))
    )
  );

  loadGroupOnUserLoadSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUserSuccess),
      map(props => loadGroup({gid: props.user.gid}))
    )
  );

  loadGroupOnUserGroupIdUpdate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUserGroupID),
      map(props => loadGroup({gid: props.gid}))
    )
  );

  loadGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadGroup),
      switchMap((props) => from(this.restClientService.getGroup(props.gid)).pipe(
        map(group => loadGroupSuccess({group})),
        catchError((err) => of(loadGroupFailure({httpError: err})))
      ))
    )
  );

  loadGroupMembersOnGroupSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadGroupSuccess),
      map(props => props.group ? loadGroupMembers({gid: props.group.gid}) : loadGroupWasNull())
    )
  );

  loadGroupMembers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadGroupMembers),
      switchMap((props) => from(this.restClientService.getGroupMembers(props.gid)).pipe(
        map(members => loadGroupMembersSuccess({members})),
        catchError((err) => of(loadGroupMembersFailure({httpError: err})))
      ))
    )
  );

  kickMember$ = createEffect(() =>
    this.actions$.pipe(
      ofType(kickMember),
      switchMap((props) => from(this.restClientService.updateUserGroupID(props.uid, '')).pipe(
        map(() => loadGroup({gid: props.gid})),
        catchError((err) => of(kickMemberFailure({httpError: err})))
      ))
    )
  );

  leaveGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(leaveGroup),
      switchMap((props) => from(this.restClientService.updateUserGroupID(props.uid, '')).pipe(
        map(() => loadGroup({gid: ''})),
        catchError((err) => of(leaveGroupFailure({httpError: err})))
      ))
    )
  );

  loadGroupByCode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadGroupByCode),
      switchMap((props) => from(this.restClientService.getGroupByCode(props.code)).pipe(
        map((group) => loadGroupByCodeSuccess({group})),
        catchError((err) => of(loadGroupMembersFailure({httpError: err})))
      ))
    )
  );

  generateNewLink$ = createEffect(() =>
    this.actions$.pipe(
      ofType(generateNewLink),
      switchMap((props) => from(this.restClientService.updateGroupCode(props.gid, GroupsHelper.generateUUID())).pipe(
        map((group) => loadGroupSuccess({group})),
        catchError((err) => of(generateNewLinkFailure({httpError: err})))
      ))
    )
  );

  deleteGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteGroup),
      switchMap((props) => from(this.restClientService.deleteGroup(props.gid)).pipe(
        map(() => deleteGroupSuccess()),
        catchError((err) => of(deleteGroupFailure({httpError: err})))
      ))
    )
  );

  promoteOwner$ = createEffect(() =>
    this.actions$.pipe(
      ofType(promoteOwner),
      switchMap((props) => from(this.restClientService.updateGroupOwner(props.gid, props.uid)).pipe(
        map((group) => promoteOwnerSuccess(group.gid)),
        catchError((err) => of(promoteOwnerFailure({httpError: err})))
      ))
    )
  );

  loadGroupOnPromotion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(promoteOwnerSuccess),
      map(props => loadGroup({gid: props.gid}))
    )
  );

  constructor(
    private actions$: Actions,
    private restClientService: RestClientService,
    private router: Router
  ) {
  }
}

