import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from "@ngrx/store";
import { SessionSelectors } from "../../planning-poker-store/selectors";
import { catchError, switchMap } from "rxjs/operators";
import { SessionActions } from "../../planning-poker-store/actions";
import { filter, Observable, of, take, tap } from "rxjs";

export const sessionGuard = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const store = inject(Store);
  const router = inject(Router);

  function getSessionFromStoreOrApi(sessionId: string): Observable<any> {
    return store.select(SessionSelectors.selectSession)
      .pipe(
        tap(session => {
          if (!session.xhr.pending && !session.xhr.failed && !session.data) {
            store.dispatch(SessionActions.getSession({ sessionId }));
          }
        }),
        filter(session => session.xhr.succeed && !!session.data),
        take(1),
      );
  }

  const sessionId = route.paramMap.get('id');
  if (sessionId) {
    return getSessionFromStoreOrApi(sessionId)
      .pipe(
        switchMap(() => of(true)),
        catchError(() => of(false))
      );
  }
  return router.navigate(['app', 'onboarding']);
};
