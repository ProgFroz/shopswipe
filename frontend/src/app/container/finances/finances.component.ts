import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {FinanceElement, Finances, Group, User} from '../../models';
import {selectUser} from '../../ngrx/selector/user.selectors';
import {selectGroup, selectGroupLoading} from '../../ngrx/selector/groups.selectors';
import {AppState} from '../../ngrx/ngrx-models';
import {Store} from '@ngrx/store';
import {
  selectFinances,
  selectFinancesGroupedSortedByUser, selectFinancesLastThreeMonths,
  selectFinancesLoading, selectFinancesMetaInformation,
  selectFinancesSumByUser
} from '../../ngrx/selector/finances.selectors';
import {FinancesMeta, MonthYear} from '../../util/finances.helper';

@Component({
  selector: 'app-finances',
  templateUrl: './finances.component.html',
  styleUrls: ['./finances.component.css']
})
export class FinancesComponent implements OnInit {

  public user$: Observable<User> = this.store.select(selectUser);
  public finances$: Observable<Finances> = this.store.select(selectFinances);
  public financesGrouped$: Observable<Map<string, Map<string, FinanceElement[]>>> = this.store.select(selectFinancesLastThreeMonths);
  public group$: Observable<Group> = this.store.select(selectGroup);
  public groupLoading$: Observable<boolean> = this.store.select(selectGroupLoading);
  public financesLoading$: Observable<boolean> = this.store.select(selectFinancesLoading);
  public groupMembersLoading$: Observable<boolean> = this.store.select(selectGroupLoading);
  public financesSumByUser$: Observable<Map<string, Map<string, number>>> = this.store.select(selectFinancesSumByUser);
  public financesMetaInformation$: Observable<Map<string, FinancesMeta[]>> = this.store.select(selectFinancesMetaInformation);

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
  }

}
