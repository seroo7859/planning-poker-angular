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
