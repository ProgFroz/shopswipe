import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {FinanceElement, Finances, Group, User} from '../../models';
import {selectUser} from '../../ngrx/selector/user.selectors';
import {selectGroup, selectGroupLoading} from '../../ngrx/selector/groups.selectors';
import {AppState} from '../../ngrx/ngrx-models';
import {Store} from '@ngrx/store';
import {
  selectFinances,
  selectFinancesGroupedSortedByUser,
  selectFinancesLoading,
  selectFinancesSumByUser
} from '../../ngrx/selector/finances.selectors';

@Component({
  selector: 'app-finances',
  templateUrl: './finances.component.html',
  styleUrls: ['./finances.component.css']
})
export class FinancesComponent implements OnInit {

  public user$: Observable<User> = this.store.select(selectUser);
  public finances$: Observable<Finances> = this.store.select(selectFinances);
  public financesGrouped$: Observable<Map<string, FinanceElement[]>> = this.store.select(selectFinancesGroupedSortedByUser);
  public group$: Observable<Group> = this.store.select(selectGroup);
  public groupLoading$: Observable<boolean> = this.store.select(selectGroupLoading);
  public financesLoading$: Observable<boolean> = this.store.select(selectFinancesLoading);
  public groupMembersLoading$: Observable<boolean> = this.store.select(selectGroupLoading);
  public financesSumByUser$: Observable<Map<string, number>> = this.store.select(selectFinancesSumByUser);

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
  }

}
