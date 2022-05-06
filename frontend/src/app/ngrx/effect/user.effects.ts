import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import { from } from 'rxjs';
import {googleLogin, loadAuthUserFailure, loadUser, loadUserFailure, loadUserSuccess} from '../action/user.actions';
import {RestClientService} from '../../rest-client.service';
import firebase from 'firebase';

@Injectable()
export class UserEffects {
  signOnUserGoogle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(googleLogin),
      switchMap(() => from(this.restClientService.googleSignIn()).pipe(
        map(beUser => loadUser({uid: beUser.user.uid})),
        catchError((err) => of(loadAuthUserFailure({httpError: err})))
      ))
    )
  );

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUser),
      switchMap((props) => from(this.restClientService.getUser(props.uid)).pipe(
        map(user => loadUserSuccess({user})),
        catchError((err) => of(loadUserFailure({httpError: err})))
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private restClientService: RestClientService
  ) {}
}

