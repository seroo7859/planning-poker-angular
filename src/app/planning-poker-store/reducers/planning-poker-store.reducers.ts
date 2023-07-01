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
  leaveSession,
  leaveSessionSuccess,
  leaveSessionFailure,
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
  renameTeamSuccess,
  teamRenamed,
  teamMemberJoined,
  teamMemberLeaved,
  teamMemberConnected,
  teamMemberDisconnected
} from "./team.reducers";
import {
  addBacklogItemSuccess,
  backlogCleared,
  backlogImported,
  backlogItemAdded,
  backlogItemMoved,
  backlogItemRemoved,
  backlogItemUpdated,
  backlogRenamed,
  clearBacklogSuccess,
  collapseBacklog,
  importBacklogSuccess,
  moveBacklogItemSuccess,
  removeBacklogItemSuccess,
  renameBacklogSuccess,
  updateBacklogItemSuccess
} from "./backlog.reducers";
import {
  estimationGiven,
  estimationRoundFinished,
  estimationRoundStarted,
  estimationSummaryReceived,
  finishEstimationRoundSuccess,
  getEstimationSummarySuccess,
  giveEstimationSuccess,
  nextEstimationRoundSuccess,
  startEstimationRoundSuccess
} from "./estimation.reducers";
import { selectCard, deselectCard } from "./deck.reducers";
import { collapseDiscussion } from "./discussion.reducers";

export const storeFeatureKey = 'planning-poker-store';

const planningPokerStoreReducers = createReducer(
  planningPokerStoreStateInitial,
  addDeck,
  selectCard,
  deselectCard,
  createSession,
  createSessionSuccess,
  createSessionFailure,
  joinSession,
  joinSessionSuccess,
  joinSessionFailure,
  leaveSession,
  leaveSessionSuccess,
  leaveSessionFailure,
  getSession,
  getSessionSuccess,
  getSessionFailure,
  getCurrentUser,
  getCurrentUserSuccess,
  getCurrentUserFailure,
  currentUserConnected,
  currentUserDisconnected,
  renameTeamSuccess,
  teamRenamed,
  teamMemberJoined,
  teamMemberLeaved,
  teamMemberConnected,
  teamMemberDisconnected,
  importBacklogSuccess,
  backlogImported,
  renameBacklogSuccess,
  backlogRenamed,
  clearBacklogSuccess,
  backlogCleared,
  collapseBacklog,
  addBacklogItemSuccess,
  backlogItemAdded,
  removeBacklogItemSuccess,
  backlogItemRemoved,
  updateBacklogItemSuccess,
  backlogItemUpdated,
  moveBacklogItemSuccess,
  backlogItemMoved,
  startEstimationRoundSuccess,
  estimationRoundStarted,
  nextEstimationRoundSuccess,
  finishEstimationRoundSuccess,
  estimationRoundFinished,
  getEstimationSummarySuccess,
  estimationSummaryReceived,
  giveEstimationSuccess,
  estimationGiven,
  collapseDiscussion
);

export const reducer = (state: PlanningPokerStoreStateModel | undefined, action: Action): any => planningPokerStoreReducers(state, action);
