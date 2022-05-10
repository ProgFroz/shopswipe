import {createSelector} from '@ngrx/store';
import {AppState, GroupsState} from '../ngrx-models';

export const selectGroupsState = (state: AppState) => state.groupsState;

export const selectGroup = createSelector(
  selectGroupsState,
  (state: GroupsState) => state.group
);
export const selectGroupLoading = createSelector(
  selectGroupsState,
  (state: GroupsState) => state.loading
);

export const selectInvitedGroup = createSelector(
  selectGroupsState,
  (state: GroupsState) => state.invitedGroup
);
export const selectInvitedGroupLoading = createSelector(
  selectGroupsState,
  (state: GroupsState) => state.invitedGroupLoading
);
export const selectGenerateNewLinkLoading = createSelector(
  selectGroupsState,
  (state: GroupsState) => state.generateNewLinkLoading
);

