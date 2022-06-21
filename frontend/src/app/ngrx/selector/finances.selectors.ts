import {createSelector} from '@ngrx/store';
import {AppState, FinancesState, GroupsState, ShoppingState} from '../ngrx-models';
import {FinancesHelper} from '../../util/finances.helper';
import {FinanceElement} from '../../models';

export const selectFinancesState = (state: AppState) => state.financesState;

export const selectFinances = createSelector(
  selectFinancesState,
  (state: FinancesState) => state.finances
);
export const selectFinancesGroupedSortedByUser = createSelector(
  selectFinancesState,
  (state: FinancesState) => FinancesHelper.groupByUser(state.finances)
);
export const selectFinancesSumByUser = createSelector(
  selectFinancesGroupedSortedByUser,
  (map: Map<string, FinanceElement[]>) => FinancesHelper.sumFinancesByUser(map)
);
export const selectFinancesLoading = createSelector(
  selectFinancesState,
  (state: FinancesState) => state.loading
);


