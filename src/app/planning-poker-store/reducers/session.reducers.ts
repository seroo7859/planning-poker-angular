import { ActionType, on } from '@ngrx/store';
import { PlanningPokerStoreStateModel } from "../state/model/planning-poker-store.state.model";
import { SessionActions } from "../actions";
import cloneDeep from "lodash.clonedeep";


// Create Session Reducers

export const createSession = on(SessionActions.createSession, (state: PlanningPokerStoreStateModel, action: ActionType<any>) => {
  const newState: PlanningPokerStoreStateModel = cloneDeep(state);
  newState.session.xhr = {
    pending: true,
    succeed: false,
    failed: false,
    error: null
  };
  return newState;
});

export const createSessionSuccess = on(SessionActions.createSessionSuccess, (state: PlanningPokerStoreStateModel, action: ActionType<any>) => {
  const newState: PlanningPokerStoreStateModel = cloneDeep(state);
  newState.session.data = action.session;
  newState.session.xhr = {
    pending: false,
    succeed: true,
    failed: false,
    error: null
  };
  return newState;
});

export const createSessionFailure = on(SessionActions.createSessionFailure, (state: PlanningPokerStoreStateModel, action: ActionType<any>) => {
  const newState: PlanningPokerStoreStateModel = cloneDeep(state);
  newState.session.xhr = {
    pending: false,
    succeed: false,
    failed: true,
    error: action.error
  };
  return newState;
});


// Join Session Reducers

export const joinSession = on(SessionActions.joinSession, (state: PlanningPokerStoreStateModel, action: ActionType<any>) => {
  const newState: PlanningPokerStoreStateModel = cloneDeep(state);
  newState.session.xhr = {
    pending: true,
    succeed: false,
    failed: false,
    error: null
  };
  return newState;
});

export const joinSessionSuccess = on(SessionActions.joinSessionSuccess, (state: PlanningPokerStoreStateModel, action: ActionType<any>) => {
  const newState: PlanningPokerStoreStateModel = cloneDeep(state);
  newState.session.data = action.session;
  newState.session.xhr = {
    pending: false,
    succeed: true,
    failed: false,
    error: null
  };
  return newState;
});

export const joinSessionFailure = on(SessionActions.joinSessionFailure, (state: PlanningPokerStoreStateModel, action: ActionType<any>) => {
  const newState: PlanningPokerStoreStateModel = cloneDeep(state);
  newState.session.xhr = {
    pending: false,
    succeed: false,
    failed: true,
    error: action.error
  };
  return newState;
});


// Leave Session Reducers

export const leaveSession = on(SessionActions.leaveSession, (state: PlanningPokerStoreStateModel, action: ActionType<any>) => {
  const newState: PlanningPokerStoreStateModel = cloneDeep(state);
  newState.session.xhr = {
    pending: true,
    succeed: false,
    failed: false,
    error: null
  };
  return newState;
});

export const leaveSessionSuccess = on(SessionActions.leaveSessionSuccess, (state: PlanningPokerStoreStateModel, action: ActionType<any>) => {
  const newState: PlanningPokerStoreStateModel = cloneDeep(state);
  newState.session.data = null;
  newState.session.xhr = {
    pending: false,
    succeed: true,
    failed: false,
    error: null
  };
  return newState;
});

export const leaveSessionFailure = on(SessionActions.leaveSessionFailure, (state: PlanningPokerStoreStateModel, action: ActionType<any>) => {
  const newState: PlanningPokerStoreStateModel = cloneDeep(state);
  newState.session.xhr = {
    pending: false,
    succeed: false,
    failed: true,
    error: action.error
  };
  return newState;
});


// Get Session Reducers

export const getSession = on(SessionActions.getSession, (state: PlanningPokerStoreStateModel, action: ActionType<any>) => {
  const newState: PlanningPokerStoreStateModel = cloneDeep(state);
  newState.session.xhr = {
    pending: true,
    succeed: false,
    failed: false,
    error: null
  };
  return newState;
});

export const getSessionSuccess = on(SessionActions.getSessionSuccess, (state: PlanningPokerStoreStateModel, action: ActionType<any>) => {
  const newState: PlanningPokerStoreStateModel = cloneDeep(state);
  newState.session.data = action.session;
  newState.session.xhr = {
    pending: false,
    succeed: true,
    failed: false,
    error: null
  };
  return newState;
});

export const getSessionFailure = on(SessionActions.getSessionFailure, (state: PlanningPokerStoreStateModel, action: ActionType<any>) => {
  const newState: PlanningPokerStoreStateModel = cloneDeep(state);
  newState.session.xhr = {
    pending: false,
    succeed: false,
    failed: true,
    error: action.error
  };
  return newState;
});
