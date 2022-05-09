import {createReducer, on} from '@ngrx/store';
import {GroupsState} from '../ngrx-models';
import {
  createGroup,
  loadGroup,
  loadGroupByCode, loadGroupByCodeFailure, loadGroupByCodeReset,
  loadGroupByCodeSuccess,
  loadGroupMembersSuccess,
  loadGroupSuccess,
  loadingGroup
} from '../action/groups.actions';

export const groupsInitialState: GroupsState = {
  group: null,
  invitedGroup: null,
  loading: true,
  invitedGroupLoading: false
};

export const groupsReducer = createReducer(
  groupsInitialState,
  on(loadGroup, (state) => {
    return ({...state, loading: true});
  }),
  on(createGroup, (state) => {
    return ({...state, loading: true});
  }),
  on(loadGroupSuccess, (state, {group}) => {
    return ({...state, group, loading: false});
  }),
  on(loadGroupMembersSuccess, (state, {members}) => {
    return ({...state, group: {...state.group, members}, loading: false});
  }),
  on(loadGroupByCode, (state) => {
    return ({...state, invitedGroupLoading: true});
  }),
  on(loadGroupByCodeSuccess, (state, {group}) => {
    return ({...state, invitedGroup: group, invitedGroupLoading: false});
  }),
  on(loadGroupByCodeFailure, (state) => {
    return ({...state, invitedGroupLoading: false});
  }),
  on(loadGroupByCodeReset, (state) => {
    return ({...state, invitedGroup: null, invitedGroupLoading: false});
  }),
  on(loadingGroup, (state, {loading}) => ({
    ...state,
    loading
  }))
);
