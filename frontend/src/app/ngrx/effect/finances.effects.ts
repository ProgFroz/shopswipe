import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {catchError, map, switchMap} from 'rxjs/operators';
import {from, of} from 'rxjs';
import {RestClientService} from '../../rest-client.service';
import {Router} from '@angular/router';
import {
  createFinances,
  createFinancesFailure,
  createFinancesSuccess,
  deleteFinances,
  deleteFinancesFailure,
  deleteFinancesSuccess,
  loadFinances,
  loadFinancesFailure,
  loadFinancesSuccess,
  updateFinancesElements,
  updateFinancesElementsFailure,
  updateFinancesElementsSuccess
} from '../action/finances.actions';
import {deleteShopping, loadShopping} from '../action/shopping.actions';
import {createGroupSuccess, deleteGroupSuccess, loadGroupSuccess} from '../action/groups.actions';

@Injectable()
export class FinancesEffects {

  loadFinances$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadFinances),
      switchMap((props) => from(this.restClientService.getFinanceList(props.gid)).pipe(
        map(finances => {
          return loadFinancesSuccess({finances});
        }),
        catchError((err) => of(loadFinancesFailure({httpError: err})))
      ))
    )
  );

  updateFinancesElements$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateFinancesElements),
      switchMap((props) => from(this.restClientService.updateFinancesList(props.gid, props.elements)).pipe(
        map(finances => {
          return updateFinancesElementsSuccess({finances});
        }),
        catchError((err) => of(updateFinancesElementsFailure({httpError: err})))
      ))
    )
  );

  loadFinancesOnCreate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createFinancesSuccess),
      map(props => loadFinances({gid: props.finances.gid}))
    )
  );

  loadFinancesOnUpdate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateFinancesElementsSuccess),
      map(props => loadShopping({gid: props.finances.gid}))
    )
  );

  createFinances$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createFinances),
      switchMap((props) => from(this.restClientService.createFinanceList(props.gid)).pipe(
        map(finances => {
          return createFinancesSuccess({finances});
        }),
        catchError((err) => of(createFinancesFailure({httpError: err})))
      ))
    )
  );

  loadFinancesOnGroupLoad$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadGroupSuccess),
      map(props => !!props.group ? (loadFinances({gid: props.group.gid})) : (loadFinancesSuccess({finances: null})))
    )
  );

  createFinancesOnGroupCreate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createGroupSuccess),
      map(props => createFinances({gid: props.group.gid}))
    )
  );

  deleteFinancesOnGroupDelete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteGroupSuccess),
      map(props => deleteFinances({gid: props.gid}))
    )
  );

  deleteFinances$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteShopping),
      switchMap((props) => from(this.restClientService.deleteFinances(props.gid)).pipe(
        map(finances => {
          return deleteFinancesSuccess();
        }),
        catchError((err) => of(deleteFinancesFailure({httpError: err})))
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private restClientService: RestClientService,
    private router: Router
  ) {
  }
}

