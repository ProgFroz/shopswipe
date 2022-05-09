import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {catchError, map, switchMap} from 'rxjs/operators';
import {from, of} from 'rxjs';
import {
  createUser,
  createUserFailure,
  createUserSuccess,
  googleLogin,
  loadAuthUserFailure,
  loadUser,
  loadUserFailure,
  loadUserSuccess,
  logoutUser,
  logoutUserFailure,
  logoutUserSuccess,
  updateUserFailure,
  updateUserGroupID,
  updateUserSuccess
} from '../action/user.actions';
import {RestClientService} from '../../rest-client.service';
import {Router} from '@angular/router';
import {createGroupSuccess} from '../action/groups.actions';

@Injectable()
export class UserEffects {
  signOnUserGoogle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(googleLogin),
      switchMap(() => from(this.restClientService.googleSignIn()).pipe(
        map(beUser => loadUser({uid: beUser.user.uid, imageUrl: beUser.user.photoURL, email: beUser.user.email, username: beUser.user.displayName})),
        catchError((err) => of(loadAuthUserFailure({httpError: err})))
      ))
    )
  );

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUser),
      switchMap((props) => from(this.restClientService.getUser(props.uid)).pipe(
        map(user => createUser({uid: props.uid, email: props.email, imageUrl: props.imageUrl, username: props.username})),
        catchError((err) => of(loadUserFailure({httpError: err})))
      ))
    )
  );

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createUser),
      switchMap((props) => from(this.restClientService.createUser(props.uid, props.email, props.imageUrl, this.trimUsername(props.username))).pipe(
        map(user => loadUserSuccess({user})),
        catchError((err) => of(createUserFailure({httpError: err})))
      ))
    )
  );



  logoutUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logoutUser),
      switchMap(() => from(this.restClientService.logoutUser()).pipe(
        map(() => {
          this.router.navigate(['/login']);
          return logoutUserSuccess();
        }),
        catchError((err) => of(logoutUserFailure({httpError: err})))
      ))
    )
  );

  updateUserGroupID$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUserGroupID),
      switchMap((props) => from(this.restClientService.updateUserGroupID(props.uid, props.gid)).pipe(
        map(user => {
          return updateUserSuccess({user});
        }),
        catchError((err) => of(updateUserFailure({httpError: err})))
      ))
    )
  );

  updateGIDonCreateSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createGroupSuccess),
      map(props => updateUserGroupID({uid: props.group.owner, gid: props.group.gid}))
    )
  );

  constructor(
    private actions$: Actions,
    private restClientService: RestClientService,
    private router: Router
  ) {
  }

  private trimUsername(username: string): string {
    return username.includes(' ') ? username.split(' ')[0] : username;
  }
}

