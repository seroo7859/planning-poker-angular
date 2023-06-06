import { ActionType, on } from '@ngrx/store';
import { PlanningPokerStoreStateModel } from "../state/model/planning-poker-store.state.model";
import { DecksActions } from "../actions";

export const addDeck = on(DecksActions.addDeck, (state: PlanningPokerStoreStateModel, action: ActionType<any>) => {
  return { ...state, decks: [ ...state.decks, action.deck ] }
});
