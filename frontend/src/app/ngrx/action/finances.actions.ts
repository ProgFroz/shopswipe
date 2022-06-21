import {createAction, props} from '@ngrx/store';
import {FinanceElement, Finances} from '../../models';
import {HttpErrorResponse} from '@angular/common/http';

export const loadingFinances = createAction(
  '[Finances] Loading changed',
  props<{ loading: boolean }>()
);

export const loadFinances = createAction(
  '[Finances] Load Finances',
  props<{ gid: string }>()
);

export const loadFinancesSuccess = createAction(
  '[Finances] Load Finances Success',
  props<{ finances: Finances }>()
);

export const loadFinancesFailure = createAction(
  '[Finances] Load Finances Failure',
  props<{ httpError: HttpErrorResponse }>()
);

export const createFinances = createAction(
  '[Finances] Create Finances',
  props<{ gid: string }>()
);

export const createFinancesSuccess = createAction(
  '[Finances] Create Finances Success',
  props<{ finances: Finances }>()
);

export const createFinancesFailure = createAction(
  '[Finances] Create Finances Failure',
  props<{ httpError: HttpErrorResponse }>()
);


export const updateFinancesElements = createAction(
  '[Finances] Update Finances Elements...',
  props<{ gid: string, elements: FinanceElement[] }>()
);

export const updateFinancesElementsSuccess = createAction(
  '[Finances] Update Finances Elements Success',
  props<{ finances: Finances }>()
);

export const updateFinancesElementsFailure = createAction(
  '[Finances] Update Finances Elements Failure',
  props<{ httpError: HttpErrorResponse }>()
);

export const deleteFinances = createAction(
  '[Finances] Delete Finances',
  props<{ gid: string }>()
);

export const deleteFinancesFailure = createAction(
  '[Finances] Delete Finances Failure',
  props<{ httpError: HttpErrorResponse }>()
);

export const deleteFinancesSuccess = createAction(
  '[Finances] Delete Finances Success'
);

