import {createReducer, on} from '@ngrx/store';
import {UserState} from '../ngrx-models';
import {dispatchUser, loadingUser} from '../action/user.actions';

export const userIntialState: UserState = {
  user: null,
  loading: true
};

export const userReducer = createReducer(
  userIntialState,
  on(dispatchUser, (state , { user }) => {
    return ({...state, user, loading: false});
  }),
  on(loadingUser, (state, { loading }) => ({
    ...state,
    loading
  }))
);
