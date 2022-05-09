import {createReducer, on} from '@ngrx/store';
import {UserState} from '../ngrx-models';
import {
  loadingUser,
  loadUser,
  loadUserSuccess,
  logoutUser,
  logoutUserSuccess, updateUserFailure,
  updateUserGroupID,
  updateUserSuccess
} from '../action/user.actions';

export const userIntialState: UserState = {
  user: null,
  loading: true
};

export const userReducer = createReducer(
  userIntialState,
  on(loadUser, (state) => {
    return ({...state, loading: true});
  }),
  on(loadUserSuccess, (state , { user }) => {
    return ({...state, user, loading: false});
  }),
  on(logoutUser, (state) => {
    return ({...state, loading: true});
  }),
  on(logoutUserSuccess, (state) => {
    return ({...state, user: null, loading: false});
  }),
  on(loadingUser, (state, { loading }) => ({
    ...state,
    loading
  })),
  on(updateUserGroupID, (state) => {
    return ({...state, loading: true});
  }),
  on(updateUserSuccess, (state, {user}) => {
    return ({...state, user, loading: false});
  }),
  on(updateUserFailure, (state) => {
    return ({...state, loading: false});
  }),
);
