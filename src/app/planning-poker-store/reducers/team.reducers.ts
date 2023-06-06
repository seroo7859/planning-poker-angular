import { ActionType, on } from '@ngrx/store';
import { TeamActions } from "../actions";
import { PlanningPokerStoreStateModel } from "../state/model/planning-poker-store.state.model";
import cloneDeep from "lodash.clonedeep";

export const teamMemberJoined = on(TeamActions.teamMemberJoined, (state: PlanningPokerStoreStateModel, action: ActionType<any>) => {
  const newState: PlanningPokerStoreStateModel = cloneDeep(state);
  if (newState.session.data) {
    newState.session.data.team.members.push(action.teamMember);
  }
  return newState;
});

export const teamMemberLeaved = on(TeamActions.teamMemberLeaved, (state: PlanningPokerStoreStateModel, action: ActionType<any>) => {
  const newState: PlanningPokerStoreStateModel = cloneDeep(state);
  if (newState.session.data) {
    const index = newState.session.data.team.members.findIndex(teamMember => teamMember.name === action.teamMember.name);
    if (index > -1) {
      newState.session.data.team.members.splice(index, 1);
    }
  }
  return newState;
});

export const teamMemberConnected = on(TeamActions.teamMemberConnected, (state: PlanningPokerStoreStateModel, action: ActionType<any>) => {
  const newState: PlanningPokerStoreStateModel = cloneDeep(state);
  if (newState.session.data) {
    const teamMemberFound = newState.session.data.team.members.find(teamMember => teamMember.name === action.teamMember.name);
    if (teamMemberFound) {
      teamMemberFound.active = true;
    }
  }
  return newState;
});

export const teamMemberDisconnected = on(TeamActions.teamMemberDisconnected, (state: PlanningPokerStoreStateModel, action: ActionType<any>) => {
  const newState: PlanningPokerStoreStateModel = cloneDeep(state);
  if (newState.session.data) {
    const teamMemberFound = newState.session.data.team.members.find(teamMember => teamMember.name === action.teamMember.name);
    if (teamMemberFound) {
      teamMemberFound.active = false;
    }
  }
  return newState;
});
