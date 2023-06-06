import { Action, createReducer } from "@ngrx/store";
import { planningPokerStoreStateInitial } from "../state/model/planning-poker-store.state.initial";
import { PlanningPokerStoreStateModel } from "../state/model/planning-poker-store.state.model";
import { addDeck } from "./decks.reducers";
import {
  createSession,
  createSessionFailure,
  createSessionSuccess,
  joinSession,
  joinSessionSuccess,
  joinSessionFailure,
  getSession,
  getSessionSuccess,
  getSessionFailure
} from "./session.reducers";
import {
  getCurrentUserFailure,
  getCurrentUser,
  getCurrentUserSuccess,
  currentUserConnected,
  currentUserDisconnected
} from "./user.reducers";
import {
  teamMemberJoined,
  teamMemberLeaved,
  teamMemberConnected,
  teamMemberDisconnected
} from "./team.reducers";

export const storeFeatureKey = 'planning-poker-store';

const planningPokerStoreReducers = createReducer(
  planningPokerStoreStateInitial,
  addDeck,
  createSession,
  createSessionSuccess,
  createSessionFailure,
  joinSession,
  joinSessionSuccess,
  joinSessionFailure,
  getSession,
  getSessionSuccess,
  getSessionFailure,
  getCurrentUser,
  getCurrentUserSuccess,
  getCurrentUserFailure,
  currentUserConnected,
  currentUserDisconnected,
  teamMemberJoined,
  teamMemberLeaved,
  teamMemberConnected,
  teamMemberDisconnected
);

export const reducer = (state: PlanningPokerStoreStateModel | undefined, action: Action): any => planningPokerStoreReducers(state, action);
