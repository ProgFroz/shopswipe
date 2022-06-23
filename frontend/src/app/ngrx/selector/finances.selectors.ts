import {createSelector} from '@ngrx/store';
import {AppState, FinancesState, GroupsState, ShoppingState} from '../ngrx-models';
import {FinancesHelper, MonthYear} from '../../util/finances.helper';
import {FinanceElement} from '../../models';

export const selectFinancesState = (state: AppState) => state.financesState;

export const selectFinances = createSelector(
  selectFinancesState,
  (state: FinancesState) => state.finances
);

export const selectFinancesGroupedByMonth = createSelector(
  selectFinancesState,
  (state: FinancesState) => FinancesHelper.groupByMonth(state.finances)
);
export const selectFinancesGroupedSortedByUser = createSelector(
  selectFinancesGroupedByMonth,
  (map: Map<string, FinanceElement[]>) => FinancesHelper.groupByUser(map)
);
export const selectFinancesSumByUser = createSelector(
  selectFinancesGroupedSortedByUser,
  (map: Map<string, Map<string, FinanceElement[]>>) => FinancesHelper.sumFinancesByUser(map)
);

export const selectFinancesLoading = createSelector(
  selectFinancesState,
  (state: FinancesState) => state.loading
);

export const selectFinancesLastThreeMonths = createSelector(
  selectFinancesGroupedSortedByUser,
  (map: Map<string, Map<string, FinanceElement[]>>) => FinancesHelper.getMostRecentMonths(map, 3)
);
