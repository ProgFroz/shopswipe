import {createAction, props} from '@ngrx/store';
import {Group, Shopping, ShoppingElement, User} from '../../models';
import {HttpErrorResponse} from '@angular/common/http';

export const loadingShopping = createAction(
  '[Shopping] Loading changed',
  props<{loading: boolean}>()
);

export const loadShopping = createAction(
  '[Shopping] Load Shopping',
  props<{gid: string}>()
);

export const loadShoppingSuccess = createAction(
  '[Shopping] Load Shopping Success',
  props<{shopping: Shopping}>()
);

export const loadShoppingFailure = createAction(
  '[Shopping] Load Shopping Failure',
  props<{httpError: HttpErrorResponse}>()
);

export const createShopping = createAction(
  '[Shopping] Update Shopping',
  props<{gid: string}>()
);

export const createShoppingSuccess = createAction(
  '[Shopping] Create Shopping Success',
  props<{shopping: Shopping}>()
);

export const createShoppingFailure = createAction(
  '[Shopping] Create Shopping Failure',
  props<{httpError: HttpErrorResponse}>()
);

export const updateShoppingElements = createAction(
  '[Shopping] Update Shopping Elements...',
  props<{gid: string, elements: ShoppingElement[]}>()
);

export const updateShoppingElementsSuccess = createAction(
  '[Shopping] Update Shopping Elements Success',
  props<{shopping: Shopping}>()
);

export const updateShoppingElementsFailure = createAction(
  '[Shopping] Update Shopping Elements Failure',
  props<{httpError: HttpErrorResponse}>()
);

export const deleteShopping = createAction(
  '[Shopping] Delete Shopping',
  props<{gid: string}>()
);

export const deleteShoppingFailure = createAction(
  '[Shopping] Delete Shopping Failure',
  props<{httpError: HttpErrorResponse}>()
);

export const deleteShoppingSuccess = createAction(
  '[Shopping] Delete Shopping Success'
);

