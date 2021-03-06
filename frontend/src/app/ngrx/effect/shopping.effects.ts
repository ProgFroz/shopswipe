import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {catchError, map, switchMap} from 'rxjs/operators';
import {from, of} from 'rxjs';
import {RestClientService} from '../../rest-client.service';
import {Router} from '@angular/router';
import {createGroupSuccess, deleteGroupSuccess, loadGroupSuccess} from '../action/groups.actions';
import {GroupsHelper} from '../../util/groups.helper';
import {
  createShopping,
  createShoppingFailure,
  createShoppingSuccess,
  deleteShopping,
  deleteShoppingFailure,
  deleteShoppingSuccess,
  finishShoppingElement,
  finishShoppingElementFailure,
  loadShopping,
  loadShoppingFailure,
  loadShoppingSuccess,
  updateShoppingElements,
  updateShoppingElementsFailure,
  updateShoppingElementsSuccess
} from '../action/shopping.actions';
import {loadFinances, updateFinancesElements, updateFinancesElementsSuccess} from '../action/finances.actions';

@Injectable()
export class ShoppingEffects {
  loadShopping$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadShopping),
      switchMap((props) => from(this.restClientService.getShoppingList(props.gid)).pipe(
        map(shopping => {
          return loadShoppingSuccess({shopping});
        }),
        catchError((err) => of(loadShoppingFailure({httpError: err})))
      ))
    )
  );

  updateShoppingElements$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateShoppingElements),
      switchMap((props) => from(this.restClientService.updateShoppingList(props.gid, props.elements)).pipe(
        map(shopping => {
          return updateShoppingElementsSuccess({shopping});
        }),
        catchError((err) => of(updateShoppingElementsFailure({httpError: err})))
      ))
    )
  );

  createShopping$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createShopping),
      switchMap((props) => from(this.restClientService.createShoppingList(props.gid, GroupsHelper.generateUUID())).pipe(
        map(shopping => {
          return createShoppingSuccess({shopping});
        }),
        catchError((err) => of(createShoppingFailure({httpError: err})))
      ))
    )
  );

  deleteShopping$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteShopping),
      switchMap((props) => from(this.restClientService.deleteShopping(props.gid)).pipe(
        map(shopping => {
          return deleteShoppingSuccess();
        }),
        catchError((err) => of(deleteShoppingFailure({httpError: err})))
      ))
    )
  );

  createShoppingOnGroupCreate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createGroupSuccess),
      map(props => createShopping({gid: props.group.gid}))
    )
  );

  deleteShoppingOnGroupDelete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteGroupSuccess),
      map(props => deleteShopping({gid: props.gid}))
    )
  );

  loadShoppingOnUpdate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateShoppingElementsSuccess),
      map(props => loadShopping({gid: props.shopping.gid}))
    )
  );

  loadShoppingOnCreate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createShoppingSuccess),
      map(props => loadShopping({gid: props.shopping.gid}))
    )
  );

  loadShoppingOnGroupLoad$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadGroupSuccess),
      map(props => !!props.group ? (loadShopping({gid: props.group.gid})) : (loadShoppingSuccess({shopping: null})))
    )
  );

  finishShoppingElement$ = createEffect(() =>
    this.actions$.pipe(
      ofType(finishShoppingElement),
      switchMap((props) => from(this.restClientService.updateShoppingList(props.gid, props.shoppingElements)).pipe(
        map(shopping => {
          return updateFinancesElements({gid: props.gid, elements: props.financesElements});
        }),
        catchError((err) => of(finishShoppingElementFailure({httpError: err})))
      ))
    )
  );

  updateShoppingElementsOnFinishElement$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateFinancesElementsSuccess),
      map(props => loadShopping({gid: props.finances.gid}))
    )
  );

  updateFinancesOnFinishElement$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateFinancesElementsSuccess),
      map(props => loadFinances({gid: props.finances.gid}))
    )
  );

  constructor(
    private actions$: Actions,
    private restClientService: RestClientService,
    private router: Router
  ) {
  }

}


