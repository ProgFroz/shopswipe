import {createReducer, on} from '@ngrx/store';
import {GroupsState, ShoppingState} from '../ngrx-models';
import {
  createGroup, deleteGroup, deleteGroupSuccess, generateNewLink,
  loadGroup,
  loadGroupByCode, loadGroupByCodeFailure, loadGroupByCodeReset,
  loadGroupByCodeSuccess,
  loadGroupMembersSuccess,
  loadGroupSuccess,
  loadingGroup
} from '../action/groups.actions';
import {Shopping} from '../../models';
import {
  deleteShopping,
  deleteShoppingSuccess,
  loadingShopping,
  loadShopping,
  loadShoppingSuccess,
  updateShoppingElements, updateShoppingElementsSuccess
} from '../action/shopping.actions';

export const shoppingInitialState: ShoppingState = {
  shopping: null,
  loading: true
};

export const shoppingReducer = createReducer(
  shoppingInitialState,
  on(loadShopping, (state) => {
    return ({...state, loading: true});
  }),
  on(loadShoppingSuccess, (state, {shopping}) => {
    return ({...state, shopping, loading: false});
  }),
  on(deleteShopping, (state) => {
    return ({...state, loading: true});
  }),
  on(deleteShoppingSuccess, (state) => {
    return ({...state, shopping: null, loading: false});
  }),

  on(loadingShopping, (state, {loading}) => ({
    ...state,
    loading
  }))
);
