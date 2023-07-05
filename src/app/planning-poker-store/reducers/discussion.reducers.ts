import { ActionType, on } from '@ngrx/store';
import { PlanningPokerStoreStateModel } from "../state/model/planning-poker-store.state.model";
import { DiscussionActions } from "../actions";
import cloneDeep from "lodash.clonedeep";

export const collapseDiscussion = on(DiscussionActions.collapseDiscussion, (state: PlanningPokerStoreStateModel, action: ActionType<any>) => {
  const newState: PlanningPokerStoreStateModel = cloneDeep(state);
  if (newState.session.data) {
    newState.session.data.discussion = { ...newState.session.data.discussion, collapsed: !newState.session.data.discussion?.collapsed };
  }
  return newState;
});

export const startDiscussionSuccess = on(DiscussionActions.startDiscussionSuccess, (state: PlanningPokerStoreStateModel, action: ActionType<any>) => {
  const newState: PlanningPokerStoreStateModel = cloneDeep(state);
  if (newState.session.data) {
    newState.session.data.discussion = action.discussion;
  }
  return newState;
});

export const discussionStarted = on(DiscussionActions.discussionStarted, (state: PlanningPokerStoreStateModel, action: ActionType<any>) => {
  const newState: PlanningPokerStoreStateModel = cloneDeep(state);
  if (newState.session.data) {
    newState.session.data.discussion = action.discussion;
  }
  return newState;
});

export const endDiscussionSuccess = on(DiscussionActions.endDiscussionSuccess, (state: PlanningPokerStoreStateModel, action: ActionType<any>) => {
  const newState: PlanningPokerStoreStateModel = cloneDeep(state);
  if (newState.session.data) {
    newState.session.data.discussion = action.discussion;
  }
  return newState;
});

export const discussionEnded = on(DiscussionActions.discussionEnded, (state: PlanningPokerStoreStateModel, action: ActionType<any>) => {
  const newState: PlanningPokerStoreStateModel = cloneDeep(state);
  if (newState.session.data) {
    newState.session.data.discussion = action.discussion;
  }
  return newState;
});

export const createDiscussionPostSuccess = on(DiscussionActions.createDiscussionPostSuccess, (state: PlanningPokerStoreStateModel, action: ActionType<any>) => {
  const newState: PlanningPokerStoreStateModel = cloneDeep(state);
  if (newState.session.data) {
    newState.session.data.discussion.posts.push(action.discussionPost);
  }
  return newState;
});

export const discussionPostCreated = on(DiscussionActions.discussionPostCreated, (state: PlanningPokerStoreStateModel, action: ActionType<any>) => {
  const newState: PlanningPokerStoreStateModel = cloneDeep(state);
  if (newState.session.data) {
    newState.session.data.discussion.posts.push(action.discussionPost);
  }
  return newState;
});
