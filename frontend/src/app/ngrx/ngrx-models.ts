import {ActionReducerMap} from '@ngrx/store';
import {userReducer} from './reducer/user.reducer';
import {Group, Shopping, User} from '../models';
import {groupsReducer} from './reducer/groups.reducer';
import {shoppingReducer} from './reducer/shopping.reducer';

export const globalReducers: ActionReducerMap<AppState> = {
  userState: userReducer,
  groupsState: groupsReducer,
  shoppingState: shoppingReducer
};
export interface AppState {
  userState: UserState;
  groupsState: GroupsState;
  shoppingState: ShoppingState;
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

export interface ShoppingState {
  shopping: Shopping;
  loading: boolean;
}
