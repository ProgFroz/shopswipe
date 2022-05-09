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
