import {ActionReducerMap} from '@ngrx/store';
import {userReducer} from './reducer/user.reducer';
import {Group, User} from '../models';
import {groupsReducer} from './reducer/groups.reducer';

export const globalReducers: ActionReducerMap<AppState> = {
  userState: userReducer,
  groupsState: groupsReducer
};
export interface AppState {
  userState: UserState;
  groupsState: GroupsState;
}
export interface UserState {
  user: User;
  loading: boolean;
}

export interface GroupsState {
  group: Group;
  invitedGroup: Group;
  loading: boolean;
  invitedGroupLoading: boolean;
  generateNewLinkLoading: boolean;
}
