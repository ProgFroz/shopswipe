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
  props<{uid: string, email: string, imageUrl: string, username: string}>()
);

export const loadUserSuccess = createAction(
  '[Auth] DB User loading success',
  props<{user: User}>()
);

export const loadUserFailure = createAction(
  '[Auth] DB User loading failure',
  props<{httpError: HttpErrorResponse}>()
);

export const createUser = createAction(
  '[Auth] DB Create User loading',
  props<{uid: string, email: string, imageUrl: string, username: string}>()
);

export const createUserSuccess = createAction(
  '[Auth] DB Create User loading success',
  props<{user: User}>()
);

export const createUserFailure = createAction(
  '[Auth] DB Create User loading failure',
  props<{httpError: HttpErrorResponse}>()
);

export const loadingUser = createAction(
  '[Auth] Loading changed',
  props<{loading: boolean}>()
);

export const logoutUser = createAction(
  '[Auth] logging out User...'
);

export const logoutUserSuccess = createAction(
  '[Auth] logging out User success!'
);

export const logoutUserFailure = createAction(
  '[Auth] logging out User failure.',
  props<{httpError: HttpErrorResponse}>()
);

export const updateUserGroupID = createAction(
  '[Auth] Update User GID loading',
  props<{uid: string, gid: string}>()
);
export const updateUserSuccess = createAction(
  '[Auth] Update User loading success',
  props<{user: User}>()
);

export const updateUserFailure = createAction(
  '[Auth] Update User loading failure',
  props<{httpError: HttpErrorResponse}>()
);

export const updateUserGoogleInformation = createAction(
  '[Auth] Update User Google Information loading',
  props<{uid: string, email: string, imageUrl: string, username: string}>()
);
