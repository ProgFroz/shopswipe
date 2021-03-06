import {Component, OnInit} from '@angular/core';
import {AppState} from '../../ngrx/ngrx-models';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Finances, Group, Shopping, User} from '../../models';
import {selectUser} from '../../ngrx/selector/user.selectors';
import {selectShopping, selectShoppingLoading} from '../../ngrx/selector/shopping.selectors';
import {finishShoppingElement, updateShoppingElements} from '../../ngrx/action/shopping.actions';
import {selectGroup, selectGroupLoading} from '../../ngrx/selector/groups.selectors';
import {selectFinances, selectFinancesLoading} from '../../ngrx/selector/finances.selectors';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {

  public user$: Observable<User> = this.store.select(selectUser);
  public shopping$: Observable<Shopping> = this.store.select(selectShopping);
  public group$: Observable<Group> = this.store.select(selectGroup);
  public finances$: Observable<Finances> = this.store.select(selectFinances);
  public groupLoading$: Observable<boolean> = this.store.select(selectGroupLoading);
  public shoppingLoading$: Observable<boolean> = this.store.select(selectShoppingLoading);
  public groupMembersLoading$: Observable<boolean> = this.store.select(selectGroupLoading);
  public financesLoading$: Observable<boolean> = this.store.select(selectFinancesLoading);

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
  }

  addElement($event: any): void {
    this.store.dispatch(updateShoppingElements({gid: $event.gid, elements: $event.elements}));
  }

  deleteElement($event: any): void {
    this.store.dispatch(updateShoppingElements({gid: $event.gid, elements: $event.elements}));
  }

  finishElement($event: any): void {
    // this.store.dispatch(updateShoppingElements({gid: $event.gid, elements: $event.elements}));
    this.store.dispatch(finishShoppingElement({
      gid: $event.gid,
      shoppingElements: $event.shoppingElements,
      financesElements: $event.financesElements
    }));
  }

  activateElement($event: any): void {
    this.store.dispatch(updateShoppingElements({gid: $event.gid, elements: $event.elements}));
  }
}
