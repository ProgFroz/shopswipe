import {createAction, props} from '@ngrx/store';
import {User} from '../../models';
import {HttpErrorResponse} from '@angular/common/http';
import firebase from 'firebase';

export const googleLogin = createAction(
  '[Auth] Google login'
);

export const loadAuthUserSuccess = createAction(
  '[Auth] Auth User delivered',
  props<{user: firebase.auth.UserCredential}>()
);

export const loadAuthUserFailure = createAction(
  '[Auth] Auth User failed',
  props<{httpError: HttpErrorResponse}>()
);

export const loadUser = createAction(
  '[Auth] DB User loading',
  props<{uid: string}>()
);

export const loadUserSuccess = createAction(
  '[Auth] DB User loading success',
  props<{user: User}>()
);

export const loadUserFailure = createAction(
  '[Auth] DB User loading success',
  props<{httpError: HttpErrorResponse}>()
);

export const loadingUser = createAction(
  '[Auth] Loading changed',
  props<{loading: boolean}>()
);
