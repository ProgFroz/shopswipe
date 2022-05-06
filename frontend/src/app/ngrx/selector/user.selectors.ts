import {createSelector} from '@ngrx/store';
import {AppState, UserState} from '../ngrx-models';

export const selectUserState = (state: AppState) => state.userState;

export const selectUser = createSelector(
  selectUserState,
  (state: UserState) => state.user
);
export const selectUserLoading = createSelector(
  selectUserState,
  (state: UserState) => state.loading
);
