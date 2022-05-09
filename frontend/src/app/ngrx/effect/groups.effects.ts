import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {catchError, map, switchMap} from 'rxjs/operators';
import {from, of} from 'rxjs';
import {loadUserSuccess} from '../action/user.actions';
import {RestClientService} from '../../rest-client.service';
import {Router} from '@angular/router';
import {createGroup, createGroupFailure, createGroupSuccess, loadGroup, loadGroupFailure, loadGroupSuccess} from '../action/groups.actions';

@Injectable()
export class GroupsEffects {
  createGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createGroup),
      switchMap((props) => from(this.restClientService.createGroup(props.name, props.owner)).pipe(
        map(group => {
          // SOMEHWERE UPDATE USER HERE?
          loadGroupSuccess({group});
          return createGroupSuccess({group});
        }),
        catchError((err) => of(createGroupFailure({httpError: err})))
      ))
    )
  );

  loadGroupOnUserLoadSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUserSuccess),
      map(props => loadGroup({gid: props.user.gid}))
    )
  );

  loadGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadGroup),
      switchMap((props) => from(this.restClientService.getGroup(props.gid)).pipe(
        map(group => loadGroupSuccess({group})),
        catchError((err) => of(loadGroupFailure({httpError: err})))
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

