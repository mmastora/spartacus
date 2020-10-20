import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { SiteConnector } from '../../connectors/site.connector';
import { SiteContextActions } from '../actions/index';

@Injectable()
export class BaseSitesEffects {
  @Effect()
  loadBaseSites$: Observable<
    | SiteContextActions.LoadBaseSitesSuccess
    | SiteContextActions.LoadBaseSitesFail
  > = this.actions$.pipe(
    ofType(SiteContextActions.LOAD_BASE_SITES),
    exhaustMap(() => {
      return this.siteConnector.getBaseSites().pipe(
        map(
          (baseSites) => new SiteContextActions.LoadBaseSitesSuccess(baseSites)
        ),
        catchError((error) =>
          of(
            new SiteContextActions.LoadBaseSitesFail(
              makeErrorSerializable(error)
            )
          )
        )
      );
    })
  );

  constructor(
    private actions$: Actions,
    private siteConnector: SiteConnector
  ) {}
}
