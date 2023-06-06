import { ActionType, on } from '@ngrx/store';
import { UserActions } from "../actions";
import { PlanningPokerStoreStateModel } from "../state/model/planning-poker-store.state.model";
import cloneDeep from "lodash.clonedeep";

export const getCurrentUser = on(UserActions.getCurrentUser, (state: PlanningPokerStoreStateModel, action: ActionType<any>) => {
  const newState: PlanningPokerStoreStateModel = cloneDeep(state);
  newState.user = null;
  return newState;
});

export const getCurrentUserSuccess = on(UserActions.getCurrentUserSuccess, (state: PlanningPokerStoreStateModel, action: ActionType<any>) => {
  const newState: PlanningPokerStoreStateModel = cloneDeep(state);
  newState.user = action.user;
  return newState;
});

export const getCurrentUserFailure = on(UserActions.getCurrentUserFailure, (state: PlanningPokerStoreStateModel, action: ActionType<any>) => {
  const newState: PlanningPokerStoreStateModel = cloneDeep(state);
  newState.user = null
  return newState;
});

export const currentUserConnected = on(UserActions.currentUserConnected, (state: PlanningPokerStoreStateModel, action: ActionType<any>) => {
  const newState: PlanningPokerStoreStateModel = cloneDeep(state);
  if (newState.user) {
    newState.user.active = true;
  }
  if (newState.session.data) {
    const currentUserFound = newState.session.data.team.members.find(teamMember => teamMember.name === newState.user?.name);
    if (currentUserFound) {
      currentUserFound.active = true;
    }
  }
  return newState;
});

export const currentUserDisconnected = on(UserActions.currentUserDisconnected, (state: PlanningPokerStoreStateModel, action: ActionType<any>) => {
  const newState: PlanningPokerStoreStateModel = cloneDeep(state);
  if (newState.user) {
    newState.user.active = false;
  }
  if (newState.session.data) {
    const currentUserFound = newState.session.data.team.members.find(teamMember => teamMember.name === newState.user?.name);
    if (currentUserFound) {
      currentUserFound.active = false;
    }
  }
  return newState;
});
