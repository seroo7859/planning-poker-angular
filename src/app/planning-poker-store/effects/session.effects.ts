import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from "rxjs/operators";
import { of } from "rxjs";
import { SessionService } from "../../core/services/session.service";
import { SessionActions } from "../actions";
import { Router } from "@angular/router";
import { HttpStatusCode } from "@angular/common/http";

@Injectable()
export class SessionEffects {

  constructor(private actions$: Actions, private sessionService: SessionService, private router: Router) {}

  createSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionActions.createSession),
      exhaustMap(action =>
        this.sessionService.createSession(action.session).pipe(
          map(session => SessionActions.createSessionSuccess({ session })),
          catchError(error => of(SessionActions.createSessionFailure({ error })))
        )
      )
    )
  );

  createSessionSuccessRedirect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SessionActions.createSessionSuccess),
      exhaustMap((action) => this.router.navigate(['app', 'dashboard', action.session.id]))
    );
  }, { dispatch: false });

  joinSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionActions.joinSession),
      exhaustMap(action =>
        this.sessionService.joinSession(action.session).pipe(
          map(session => SessionActions.joinSessionSuccess({ session })),
          catchError(error => of(SessionActions.joinSessionFailure({ error })))
        )
      )
    )
  );

  joinSessionSuccessRedirect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SessionActions.joinSessionSuccess),
      exhaustMap((action) => this.router.navigate(['app', 'dashboard', action.session.id]))
    );
  }, { dispatch: false });

  getSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionActions.getSession),
      exhaustMap(action =>
        this.sessionService.getSession(action.sessionId).pipe(
          map(session => SessionActions.getSessionSuccess({ session })),
          catchError(error => of(SessionActions.getSessionFailure({ sessionId: action.sessionId, error })))
        )
      )
    )
  );

  getSessionFailureRedirect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SessionActions.getSessionFailure),
      exhaustMap((action) => {
        if (action.error.status === HttpStatusCode.Unauthorized) {
          return this.router.navigate(['app', 'onboarding', 'join-session'], { queryParams: { id: action.sessionId }});
        }
        return this.router.navigate(['app', 'onboarding']);
      })
    );
  }, { dispatch: false });

}
