import {createReducer, on} from '@ngrx/store';
import {FinancesState, GroupsState, ShoppingState} from '../ngrx-models';
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
import {deleteFinances, deleteFinancesSuccess, loadFinances, loadFinancesSuccess, loadingFinances} from '../action/finances.actions';

export const financesInitialState: FinancesState = {
  finances: null,
  loading: true
};

export const financesReducer = createReducer(
  financesInitialState,
  on(loadFinances, (state) => {
    return ({...state, loading: true});
  }),
  on(loadFinancesSuccess, (state, {finances}) => {
    return ({...state, finances, loading: false});
  }),
  on(deleteFinances, (state) => {
    return ({...state, loading: true});
  }),
  on(deleteFinancesSuccess, (state) => {
    return ({...state, shopping: null, loading: false});
  }),

  on(loadingFinances, (state, {loading}) => ({
    ...state,
    loading
  }))
);
