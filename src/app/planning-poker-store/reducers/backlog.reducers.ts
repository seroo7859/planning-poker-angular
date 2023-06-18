import { ActionType, on } from '@ngrx/store';
import { PlanningPokerStoreStateModel } from "../state/model/planning-poker-store.state.model";
import { BacklogActions } from "../actions";
import cloneDeep from "lodash.clonedeep";

export const importBacklogSuccess = on(BacklogActions.importBacklogSuccess, (state: PlanningPokerStoreStateModel, action: ActionType<any>) => {
  const newState: PlanningPokerStoreStateModel = cloneDeep(state);
  if (newState.session.data) {
    newState.session.data.backlog = action.backlog;
  }
  return newState;
});

export const backlogImported = on(BacklogActions.backlogImported, (state: PlanningPokerStoreStateModel, action: ActionType<any>) => {
  const newState: PlanningPokerStoreStateModel = cloneDeep(state);
  if (newState.session.data) {
    newState.session.data.backlog = action.backlog;
  }
  return newState;
});


export const renameBacklogSuccess = on(BacklogActions.renameBacklogSuccess, (state: PlanningPokerStoreStateModel, action: ActionType<any>) => {
  const newState: PlanningPokerStoreStateModel = cloneDeep(state);
  if (newState.session.data) {
    newState.session.data.backlog = action.backlog;
  }
  return newState;
});

export const backlogRenamed = on(BacklogActions.backlogRenamed, (state: PlanningPokerStoreStateModel, action: ActionType<any>) => {
  const newState: PlanningPokerStoreStateModel = cloneDeep(state);
  if (newState.session.data) {
    newState.session.data.backlog.name = action.name;
  }
  return newState;
});

export const clearBacklogSuccess = on(BacklogActions.clearBacklogSuccess, (state: PlanningPokerStoreStateModel, action: ActionType<any>) => {
  const newState: PlanningPokerStoreStateModel = cloneDeep(state);
  if (newState.session.data) {
    newState.session.data.backlog.items.splice(0, newState.session.data.backlog.items.length);
  }
  return newState;
});

export const backlogCleared = on(BacklogActions.backlogCleared, (state: PlanningPokerStoreStateModel, action: ActionType<any>) => {
  const newState: PlanningPokerStoreStateModel = cloneDeep(state);
  if (newState.session.data) {
    newState.session.data.backlog.items.splice(0, newState.session.data.backlog.items.length);
  }
  return newState;
});

export const addBacklogItemSuccess = on(BacklogActions.addBacklogItemSuccess, (state: PlanningPokerStoreStateModel, action: ActionType<any>) => {
  const newState: PlanningPokerStoreStateModel = cloneDeep(state);
  if (newState.session.data) {
    newState.session.data.backlog.items.push(action.backlogItem);
  }
  return newState;
});

export const backlogItemAdded = on(BacklogActions.backlogItemAdded, (state: PlanningPokerStoreStateModel, action: ActionType<any>) => {
  const newState: PlanningPokerStoreStateModel = cloneDeep(state);
  if (newState.session.data) {
    newState.session.data.backlog.items.push(action.backlogItem);
  }
  return newState;
});

export const removeBacklogItemSuccess = on(BacklogActions.removeBacklogItemSuccess, (state: PlanningPokerStoreStateModel, action: ActionType<any>) => {
  const newState: PlanningPokerStoreStateModel = cloneDeep(state);
  if (newState.session.data) {
    const index = newState.session.data.backlog.items.findIndex(backlogItem => backlogItem.number === action.backlogItemNumber);
    if (index > -1) {
      newState.session.data.backlog.items.splice(index, 1);
    }
  }
  return newState;
});

export const backlogItemRemoved = on(BacklogActions.backlogItemRemoved, (state: PlanningPokerStoreStateModel, action: ActionType<any>) => {
  const newState: PlanningPokerStoreStateModel = cloneDeep(state);
  if (newState.session.data) {
    const index = newState.session.data.backlog.items.findIndex(backlogItem => backlogItem.number === action.backlogItem.number);
    if (index > -1) {
      newState.session.data.backlog.items.splice(index, 1);
    }
  }
  return newState;
});

export const updateBacklogItemSuccess = on(BacklogActions.updateBacklogItemSuccess, (state: PlanningPokerStoreStateModel, action: ActionType<any>) => {
  const newState: PlanningPokerStoreStateModel = cloneDeep(state);
  if (newState.session.data) {
    const backlogItemFound = newState.session.data.backlog.items.find(backlogItem => backlogItem.number === action.backlogItem.number);
    if (backlogItemFound) {
      backlogItemFound.title = action.backlogItem.title;
      backlogItemFound.description = action.backlogItem.description;
      backlogItemFound.estimation = action.backlogItem.estimation;
      backlogItemFound.priority = action.backlogItem.priority;
    }
  }
  return newState;
});

export const backlogItemUpdated = on(BacklogActions.backlogItemUpdated, (state: PlanningPokerStoreStateModel, action: ActionType<any>) => {
  const newState: PlanningPokerStoreStateModel = cloneDeep(state);
  if (newState.session.data) {
    const backlogItemFound = newState.session.data.backlog.items.find(backlogItem => backlogItem.number === action.backlogItem.number);
    if (backlogItemFound) {
      backlogItemFound.title = action.backlogItem.title;
      backlogItemFound.description = action.backlogItem.description;
      backlogItemFound.estimation = action.backlogItem.estimation;
      backlogItemFound.priority = action.backlogItem.priority;
    }
  }
  return newState;
});

export const moveBacklogItemSuccess = on(BacklogActions.moveBacklogItemSuccess, (state: PlanningPokerStoreStateModel, action: ActionType<any>) => {
  const newState: PlanningPokerStoreStateModel = cloneDeep(state);
  if (newState.session.data) {
    newState.session.data.backlog.items = action.backlogItems;
  }
  return newState;
});

export const backlogItemMoved = on(BacklogActions.backlogItemMoved, (state: PlanningPokerStoreStateModel, action: ActionType<any>) => {
  const newState: PlanningPokerStoreStateModel = cloneDeep(state);
  if (newState.session.data) {
    newState.session.data.backlog.items = action.backlog.items;
  }
  return newState;
});
