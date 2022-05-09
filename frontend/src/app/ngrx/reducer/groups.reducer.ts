import {createReducer, on} from '@ngrx/store';
import {GroupsState} from '../ngrx-models';
import {createGroup, loadGroup, loadGroupMembersSuccess, loadGroupSuccess, loadingGroup} from '../action/groups.actions';

export const groupsInitialState: GroupsState = {
  group: null,
  loading: true
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
  on(loadingGroup, (state, {loading}) => ({
    ...state,
    loading
  }))
);