import {createReducer, on} from '@ngrx/store';
import {UserState} from '../ngrx-models';
import {loadingUser, loadUserSuccess} from '../action/user.actions';
import firebase from 'firebase';

export const userIntialState: UserState = {
  user: null,
  loading: true
};

export const userReducer = createReducer(
  userIntialState,
  on(loadUserSuccess, (state , { user }) => {
    return ({...state, user: user, loading: false});
  }),
  on(loadingUser, (state, { loading }) => ({
    ...state,
    loading
  }))
);
