import { ActionType, on } from '@ngrx/store';
import { PlanningPokerStoreStateModel } from "../state/model/planning-poker-store.state.model";
import { EstimationActions } from "../actions";
import cloneDeep from "lodash.clonedeep";

export const startEstimationRoundSuccess = on(EstimationActions.startEstimationRoundSuccess, (state: PlanningPokerStoreStateModel, action: ActionType<any>) => {
  const newState: PlanningPokerStoreStateModel = cloneDeep(state);
  if (newState.session.data) {
    newState.session.data.estimationRound = action.estimationRound;
  }
  return newState;
});

export const estimationRoundStarted = on(EstimationActions.estimationRoundStarted, (state: PlanningPokerStoreStateModel, action: ActionType<any>) => {
  const newState: PlanningPokerStoreStateModel = cloneDeep(state);
  if (newState.session.data) {
    newState.session.data.estimationRound = action.estimationRound;
  }
  return newState;
});

export const nextEstimationRoundSuccess = on(EstimationActions.nextEstimationRoundSuccess, (state: PlanningPokerStoreStateModel, action: ActionType<any>) => {
  const newState: PlanningPokerStoreStateModel = cloneDeep(state);
  if (newState.session.data) {
    newState.session.data.estimationRound = action.estimationRound;
  }
  return newState;
});

export const finishEstimationRoundSuccess = on(EstimationActions.finishEstimationRoundSuccess, (state: PlanningPokerStoreStateModel, action: ActionType<any>) => {
  const newState: PlanningPokerStoreStateModel = cloneDeep(state);
  if (newState.session.data) {
    newState.session.data.estimationRound = action.estimationRound;
  }
  return newState;
});

export const estimationRoundFinished = on(EstimationActions.estimationRoundFinished, (state: PlanningPokerStoreStateModel, action: ActionType<any>) => {
  const newState: PlanningPokerStoreStateModel = cloneDeep(state);
  if (newState.session.data) {
    newState.session.data.estimationRound = action.estimationRound;
  }
  return newState;
});

export const getEstimationSummarySuccess = on(EstimationActions.getEstimationSummarySuccess, (state: PlanningPokerStoreStateModel, action: ActionType<any>) => {
  const newState: PlanningPokerStoreStateModel = cloneDeep(state);
  if (newState.session.data) {
    newState.session.data.estimationSummary = action.estimationSummary;

    if(action.estimationSummary.consensusReached) {
      const backlogItemFound = newState.session.data.backlog.items.find(backlogItem => backlogItem.number === action.estimationSummary.backlogItemNumber);
      if (backlogItemFound) {
        backlogItemFound.estimation = action.estimationSummary.recommendation;
      }
    }
  }
  return newState;
});

export const estimationSummaryReceived = on(EstimationActions.estimationSummaryReceived, (state: PlanningPokerStoreStateModel, action: ActionType<any>) => {
  const newState: PlanningPokerStoreStateModel = cloneDeep(state);
  if (newState.session.data) {
    newState.session.data.estimationSummary = action.estimationSummary;

    if(action.estimationSummary.consensusReached) {
      const backlogItemFound = newState.session.data.backlog.items.find(backlogItem => backlogItem.number === action.estimationSummary.backlogItemNumber);
      if (backlogItemFound) {
        backlogItemFound.estimation = action.estimationSummary.recommendation;
      }
    }
  }
  return newState;
});

export const giveEstimationSuccess = on(EstimationActions.giveEstimationSuccess, (state: PlanningPokerStoreStateModel, action: ActionType<any>) => {
  const newState: PlanningPokerStoreStateModel = cloneDeep(state);
  if (newState.session.data) {
    const estimationFound = newState.session.data.estimationRound?.estimations.find(estimation => estimation.estimator === action.estimation.estimator);
    if (estimationFound) {
      estimationFound.estimationValue = action.estimation.estimationValue;
      estimationFound.estimator = action.estimation.estimator;
      estimationFound.createdAt = action.estimation.createdAt;
      estimationFound.updatedAt = action.estimation.updatedAt;
    } else {
      newState.session.data.estimationRound?.estimations.push(action.estimation);
    }
  }
  return newState;
});

export const estimationGiven = on(EstimationActions.estimationGiven, (state: PlanningPokerStoreStateModel, action: ActionType<any>) => {
  const newState: PlanningPokerStoreStateModel = cloneDeep(state);
  if (newState.session.data) {
    const estimationFound = newState.session.data.estimationRound?.estimations.find(estimation => estimation.estimator === action.estimation.estimator);
    if (estimationFound) {
      estimationFound.estimationValue = action.estimation.estimationValue;
      estimationFound.estimator = action.estimation.estimator;
      estimationFound.createdAt = action.estimation.createdAt;
      estimationFound.updatedAt = action.estimation.updatedAt;
    } else {
      newState.session.data.estimationRound?.estimations.push(action.estimation);
    }
  }
  return newState;
});
