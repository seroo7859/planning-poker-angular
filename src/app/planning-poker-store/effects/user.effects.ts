import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SessionActions, UserActions } from "../actions";
import { exhaustMap } from "rxjs/operators";
import { AuthService } from "../../core/services/auth.service";
import { of } from "rxjs";

@Injectable()
export class UserEffects {

  constructor(private actions$: Actions, private authService: AuthService) {}

  getCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getCurrentUser),
      exhaustMap(() => {
          if (this.authService.isAuthenticated()) {
            return of(UserActions.getCurrentUserSuccess({ user: this.authService.getCurrentUser() }));
          }
          return of(UserActions.getCurrentUserFailure({ error: new Error('User is not authenticated') }));
        }
      )
    )
  );

  getCurrentUserWhenCreateSessionSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionActions.createSessionSuccess),
      exhaustMap(() => of(UserActions.getCurrentUser()))
    )
  );

  getCurrentUserWhenJoinSessionSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionActions.joinSessionSuccess),
      exhaustMap(() => of(UserActions.getCurrentUser()))
    )
  );

  getCurrentUserWhenGetSessionSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionActions.getSessionSuccess),
      exhaustMap(() => of(UserActions.getCurrentUser()))
    )
  );

}
