import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DeckActions, EstimationActions, UserActions } from "../actions";
import { exhaustMap } from "rxjs/operators";
import { EMPTY, of, withLatestFrom } from "rxjs";
import { EstimationSelectors, UserSelectors } from "../selectors";
import { Store } from "@ngrx/store";

@Injectable()
export class DeckEffects {

  constructor(private actions$: Actions, private readonly store: Store) {}

  selectCardWhenGiveEstimationSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EstimationActions.giveEstimationSuccess),
      exhaustMap(({ estimation }) => of(DeckActions.selectCard({ value: estimation.estimationValue })))
    )
  );

  selectCardWhenGetCurrentUserSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getCurrentUserSuccess),
      withLatestFrom(this.store.select(EstimationSelectors.selectEstimationRound)),
      exhaustMap(([{ user}, estimationRound]) => {
        if (estimationRound?.finishedAt) {
          return EMPTY;
        }
        const estimationFound = estimationRound?.estimations.find(estimation => estimation.estimator === user.name);
        if (estimationFound) {
          return of(DeckActions.selectCard({ value: estimationFound.estimationValue }));
        }
        return EMPTY;
      })
    )
  );

  deselectCardWhenGiveEstimationFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EstimationActions.giveEstimationFailure),
      exhaustMap(({ estimationValue }) => of(DeckActions.deselectCard({ value: estimationValue })))
    )
  );

  deselectCardWhenFinishEstimationRoundSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EstimationActions.finishEstimationRoundSuccess),
      withLatestFrom(this.store.select(UserSelectors.selectUser)),
      exhaustMap(([ { estimationRound }, user ]) => {
        console.log(estimationRound);
        const estimationFound = estimationRound?.estimations.find(estimation => estimation.estimator === user?.name);
        if (estimationFound) {
          return of(DeckActions.deselectCard({ value: estimationFound.estimationValue }));
        }
        return EMPTY;
      })
    )
  );

  deselectCardWhenEstimationRoundFinished$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EstimationActions.estimationRoundFinished),
      withLatestFrom(this.store.select(UserSelectors.selectUser)),
      exhaustMap(([ { estimationRound }, user ]) => {
        console.log(estimationRound);
        const estimationFound = estimationRound?.estimations.find(estimation => estimation.estimator === user?.name);
        if (estimationFound) {
          return of(DeckActions.deselectCard({ value: estimationFound.estimationValue }));
        }
        return EMPTY;
      })
    )
  );
}
