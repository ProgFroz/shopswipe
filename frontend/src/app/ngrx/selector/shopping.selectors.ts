import {createSelector} from '@ngrx/store';
import {AppState, GroupsState, ShoppingState} from '../ngrx-models';

export const selectShoppingState = (state: AppState) => state.shoppingState;

export const selectShopping = createSelector(
  selectShoppingState,
  (state: ShoppingState) => state.shopping
);
export const selectShoppingLoading = createSelector(
  selectShoppingState,
  (state: ShoppingState) => state.loading
);


