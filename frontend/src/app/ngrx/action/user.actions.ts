import {createAction, props} from '@ngrx/store';
import {User} from '../../models';

export const googleLogin = createAction(
  '[Auth] Google login',
  props<{user: User}>()
);

export const dispatchUser = createAction(
  '[Auth] User delivered',
  props<{user: User}>()
);

export const loadingUser = createAction(
  '[Auth] Loading changed',
  props<{loading: boolean}>()
);
