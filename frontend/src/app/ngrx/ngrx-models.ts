import {ActionReducerMap} from '@ngrx/store';
import {userReducer} from './reducer/user.reducer';
import {User} from '../models';

export const globalReducers: ActionReducerMap<AppState> = {
  userState: userReducer,
};
export interface AppState {
  userState: UserState;
}
export interface UserState {
  user: User;
  loading: boolean;
}


