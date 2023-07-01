import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { EstimationService } from "../../core/services/estimation.service";
import { ToastService } from "../../core/services/toast.service";
import { EstimationActions } from "../actions";
import { EMPTY, exhaustMap, of, withLatestFrom } from "rxjs";
import { SessionSelectors } from "../selectors";
import { catchError, map } from "rxjs/operators";
import { BacklogModel } from "../../core/models/backlog.model";

@Injectable()
export class EstimationEffects {

  constructor(private actions$: Actions, private readonly store: Store, private estimationService: EstimationService, private toastService: ToastService) {}

  startEstimationRound$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EstimationActions.startEstimationRound),
      withLatestFrom(this.store.select(SessionSelectors.selectSession)),
      exhaustMap(([action, session]) =>
        this.estimationService.startEstimationRound(session.data!.id, action.backlogItemNumber).pipe(
          map(estimationRound => EstimationActions.startEstimationRoundSuccess({ estimationRound })),
          catchError(error => of(EstimationActions.startEstimationRoundFailure({ error })))
        )
      )
    )
  );

  startEstimationRoundFailureToast$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EstimationActions.startEstimationRoundFailure),
      map(({ error }) => this.toastService.showError({ text: 'Start estimation round failed' }))
    );
  }, { dispatch: false });

  nextEstimationRound$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EstimationActions.nextEstimationRound),
      withLatestFrom(this.store.select(SessionSelectors.selectSession)),
      exhaustMap(([action, session]) => {
        if (session.data!.backlog.items.length === 0) {
          this.toastService.showInfo({ text: 'No backlog items to estimate' });
          return EMPTY;
        }
        if (this.getNumberOfEstimatedBacklogItems(session.data!.backlog) === session.data!.backlog.items.length) {
          this.toastService.showInfo({ text: 'All backlog items have been estimated' });
          return EMPTY;
        }
        return this.estimationService.nextEstimationRound(session.data!.id).pipe(
          map(estimationRound => EstimationActions.nextEstimationRoundSuccess({ estimationRound })),
          catchError(error => of(EstimationActions.nextEstimationRoundFailure({ error })))
        )
      })
    )
  );

  private getNumberOfEstimatedBacklogItems(backlog: BacklogModel): number {
    return backlog.items.filter(backlogItem => backlogItem.estimation && backlogItem.estimation.length > 0).length;
  }

  nextEstimationRoundFailureToast$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EstimationActions.nextEstimationRoundFailure),
      map(({ error }) => this.toastService.showError({ text: 'Start next estimation round failed' }))
    );
  }, { dispatch: false });

  finishEstimationRound$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EstimationActions.finishEstimationRound),
      withLatestFrom(this.store.select(SessionSelectors.selectSession)),
      exhaustMap(([action, session]) =>
        this.estimationService.finishEstimationRound(session.data!.id).pipe(
          map(estimationRound => EstimationActions.finishEstimationRoundSuccess({ estimationRound })),
          catchError(error => of(EstimationActions.finishEstimationRoundFailure({ error })))
        )
      )
    )
  );

  finishEstimationRoundFailureToast$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EstimationActions.finishEstimationRoundFailure),
      map(({ error }) => this.toastService.showError({ text: 'Finish estimation round failed' }))
    );
  }, { dispatch: false });

  getEstimationSummary$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EstimationActions.getEstimationSummary),
      withLatestFrom(this.store.select(SessionSelectors.selectSession)),
      exhaustMap(([action, session]) =>
        this.estimationService.getEstimationSummary(session.data!.id).pipe(
          map(estimationSummary => EstimationActions.getEstimationSummarySuccess({ estimationSummary })),
          catchError(error => of(EstimationActions.getEstimationSummaryFailure({ error })))
        )
      )
    )
  );

  getEstimationSummarySuccessToast$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EstimationActions.getEstimationSummarySuccess, EstimationActions.estimationSummaryReceived),
      map(({ estimationSummary }) => {
        if (estimationSummary.consensusReached) {
          this.toastService.showInfo({ text: `Consensus for the backlog item ${estimationSummary.backlogItemNumber} reached` });
        }
      })
    );
  }, { dispatch: false });

  getEstimationSummaryWhenFinishEstimationRoundSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EstimationActions.finishEstimationRoundSuccess),
      exhaustMap(() => of(EstimationActions.getEstimationSummary()))
    )
  );

  giveEstimation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EstimationActions.giveEstimation),
      withLatestFrom(this.store.select(SessionSelectors.selectSession)),
      exhaustMap(([action, session]) =>
        this.estimationService.giveEstimation(session.data!.id, action.estimationValue).pipe(
          map(estimation => EstimationActions.giveEstimationSuccess({ estimation })),
          catchError(error => of(EstimationActions.giveEstimationFailure({ estimationValue: action.estimationValue, error })))
        )
      )
    )
  );

  giveEstimationFailureToast$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EstimationActions.giveEstimationFailure),
      map(({ error }) => this.toastService.showError({ text: 'Give an estimation failed' }))
    );
  }, { dispatch: false });

}
