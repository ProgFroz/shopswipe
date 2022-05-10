import {createAction, props} from '@ngrx/store';
import {Group, User} from '../../models';
import {HttpErrorResponse} from '@angular/common/http';

export const loadingGroup = createAction(
  '[Group] Loading changed',
  props<{loading: boolean}>()
);

export const loadGroup = createAction(
  '[Group] Load Group',
  props<{gid: string}>()
);

export const loadGroupSuccess = createAction(
  '[Group] Load Group Success',
  props<{group: Group}>()
);

export const loadGroupWasNull = createAction(
  '[Group] User Has No Group'
);
export const loadGroupFailure = createAction(
  '[Group] Load Group Failure',
  props<{httpError: HttpErrorResponse}>()
);

export const createGroup = createAction(
  '[Group] Create Group',
  props<{name: string, owner: string}>()
);

export const createGroupSuccess = createAction(
  '[Group] Create Group Success',
  props<{group: Group}>()
);

export const createGroupFailure = createAction(
  '[Group] Create Group Failure',
  props<{httpError: HttpErrorResponse}>()
);

export const updateGroup = createAction(
  '[Group] Update Group',
  props<{group: Group}>()
);

export const updateGroupSuccess = createAction(
  '[Group] Update Group Success',
  props<{group: Group}>()
);

export const updateGroupFailure = createAction(
  '[Group] Update Group Failure',
  props<{httpError: HttpErrorResponse}>()
);

export const loadGroupMembers = createAction(
  '[Group] Load Group Members',
  props<{gid: string}>()
);

export const loadGroupMembersSuccess = createAction(
  '[Group] Load Group Members Success',
  props<{members: User[]}>()
);

export const loadGroupMembersFailure = createAction(
  '[Group] Load Group Members Failure',
  props<{httpError: HttpErrorResponse}>()
);

export const kickMember = createAction(
  '[Group] Kicking Member...',
  props<{uid: string, gid: string}>()
);

export const kickMemberFailure = createAction(
  '[Group] Kicking Member Failure.',
  props<{httpError: HttpErrorResponse}>()
);

export const loadGroupByCode = createAction(
  '[Group] Load Group By Code',
  props<{code: string}>()
);

export const loadGroupByCodeSuccess = createAction(
  '[Group] Load Group By Code Success',
  props<{group: Group}>()
);

export const loadGroupByCodeFailure = createAction(
  '[Group] Load Group By Code Failure',
  props<{httpError: HttpErrorResponse}>()
);

export const loadGroupByCodeReset = createAction(
  '[Group] Reset Group By Code'
);

export const generateNewLink = createAction(
  '[Group] Generating New Link...',
  props<{gid: string}>()
);

export const generateNewLinkFailure = createAction(
  '[Group] Generating New Link Failure.',
  props<{httpError: HttpErrorResponse}>()
);

export const deleteGroup = createAction(
  '[Group] Deleting Group...',
  props<{gid: string}>()
);

export const deleteGroupSuccess = createAction(
  '[Group] Deleting Group Success!'
);

export const deleteGroupFailure = createAction(
  '[Group] Deleting Group Failure.',
  props<{httpError: HttpErrorResponse}>()
);

export const promoteOwner = createAction(
  '[Group] Promoting Owner...',
  props<{gid: string, uid: string}>()
);

export const promoteOwnerSuccess = createAction(
  '[Group] Promoting Owner Success!',
  props<{gid: string}>()
);

export const promoteOwnerFailure = createAction(
  '[Group] Promoting Owner Failure.',
  props<{httpError: HttpErrorResponse}>()
);

export const leaveGroup = createAction(
  '[Group] Leaving Group...',
  props<{uid: string}>()
);

export const leaveGroupFailure = createAction(
  '[Group] Leaving Group Failure.',
  props<{httpError: HttpErrorResponse}>()
);
