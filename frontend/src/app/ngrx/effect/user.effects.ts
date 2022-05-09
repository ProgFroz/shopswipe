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
  logoutUserSuccess
} from '../action/user.actions';
import {RestClientService} from '../../rest-client.service';
import {Router} from '@angular/router';

@Injectable()
export class UserEffects {
  signOnUserGoogle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(googleLogin),
      switchMap(() => from(this.restClientService.googleSignIn()).pipe(
        map(beUser => loadUser({uid: beUser.user.uid, imageUrl: beUser.user.email, email: beUser.user.photoURL})),
        catchError((err) => of(loadAuthUserFailure({httpError: err})))
      ))
    )
  );

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUser),
      switchMap((props) => from(this.restClientService.getUser(props.uid)).pipe(
        map(user => user ? loadUserSuccess({user}) : createUser({uid: props.uid, email: props.email, imageUrl: props.imageUrl})),
        catchError((err) => of(loadUserFailure({httpError: err})))
      ))
    )
  );

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createUser),
      switchMap((props) => from(this.restClientService.createUser(props.uid, props.email, props.imageUrl)).pipe(
        map(user => {
          loadUserSuccess({user});
          return createUserSuccess({user});
        }),
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

  constructor(
    private actions$: Actions,
    private restClientService: RestClientService,
    private router: Router
  ) {
  }
}

