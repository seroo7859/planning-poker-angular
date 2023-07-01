import { createAction, props } from '@ngrx/store';
import { ActionTypes } from "./planning-poker-store.actions";
import { EstimationModel, EstimationRoundModel, EstimationSummaryModel } from "../../core/models/estimation.model";
import { HttpErrorResponse } from "@angular/common/http";


// Start Estimation Round Actions

export const startEstimationRound = createAction(
  ActionTypes.StartEstimationRound,
  props<{ backlogItemNumber: string }>()
);

export const startEstimationRoundSuccess = createAction(
  ActionTypes.StartEstimationRoundSuccess,
  props<{ estimationRound: EstimationRoundModel }>()
);

export const startEstimationRoundFailure = createAction(
  ActionTypes.StartEstimationRoundFailure,
  props<{ error: HttpErrorResponse }>()
);

export const estimationRoundStarted = createAction(
  ActionTypes.EstimationRoundStarted,
  props<{ estimationRound: EstimationRoundModel }>()
);


// Next Estimation Round Actions

export const nextEstimationRound = createAction(
  ActionTypes.NextEstimationRound
);

export const nextEstimationRoundSuccess = createAction(
  ActionTypes.NextEstimationRoundSuccess,
  props<{ estimationRound: EstimationRoundModel }>()
);

export const nextEstimationRoundFailure = createAction(
  ActionTypes.NextEstimationRoundFailure,
  props<{ error: HttpErrorResponse }>()
);


// Finish Estimation Round Actions

export const finishEstimationRound = createAction(
  ActionTypes.FinishEstimationRound
);

export const finishEstimationRoundSuccess = createAction(
  ActionTypes.FinishEstimationRoundSuccess,
  props<{ estimationRound: EstimationRoundModel }>()
);

export const finishEstimationRoundFailure = createAction(
  ActionTypes.FinishEstimationRoundFailure,
  props<{ error: HttpErrorResponse }>()
);

export const estimationRoundFinished = createAction(
  ActionTypes.EstimationRoundFinished,
  props<{ estimationRound: EstimationRoundModel }>()
);


// Get Estimation Summary Actions

export const getEstimationSummary = createAction(
  ActionTypes.GetEstimationSummary
);

export const getEstimationSummarySuccess = createAction(
  ActionTypes.GetEstimationSummarySuccess,
  props<{ estimationSummary: EstimationSummaryModel }>()
);

export const getEstimationSummaryFailure = createAction(
  ActionTypes.GetEstimationSummaryFailure,
  props<{ error: HttpErrorResponse }>()
);

export const estimationSummaryReceived = createAction(
  ActionTypes.EstimationSummaryReceived,
  props<{ estimationSummary: EstimationSummaryModel }>()
);


// Give Estimation Actions

export const giveEstimation = createAction(
  ActionTypes.GiveEstimation,
  props<{ estimationValue: string }>()
);

export const giveEstimationSuccess = createAction(
  ActionTypes.GiveEstimationSuccess,
  props<{ estimation: EstimationModel }>()
);

export const giveEstimationFailure = createAction(
  ActionTypes.GiveEstimationFailure,
  props<{ estimationValue: string, error: HttpErrorResponse }>()
);

export const estimationGiven = createAction(
  ActionTypes.EstimationGiven,
  props<{ estimation: EstimationModel }>()
);
