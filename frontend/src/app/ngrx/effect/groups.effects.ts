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
  loadGroup,
  loadGroupFailure,
  loadGroupMembers,
  loadGroupMembersFailure,
  loadGroupMembersSuccess,
  loadGroupSuccess
} from '../action/groups.actions';

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
      map(props => loadGroupMembers({gid: props.group.gid}))
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

  constructor(
    private actions$: Actions,
    private restClientService: RestClientService,
    private router: Router
  ) {
  }
}

