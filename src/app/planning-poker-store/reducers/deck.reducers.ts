import { ActionType, on } from '@ngrx/store';
import { PlanningPokerStoreStateModel } from "../state/model/planning-poker-store.state.model";
import { DeckActions } from "../actions";
import cloneDeep from "lodash.clonedeep";

export const selectCard = on(DeckActions.selectCard, (state: PlanningPokerStoreStateModel, action: ActionType<any>) => {
  const newState: PlanningPokerStoreStateModel = cloneDeep(state);
  if (newState.session.data) {
    newState.session.data.deck.cards.forEach(card => card.selected = card.value === action.value);
  }
  return newState;
});

export const deselectCard = on(DeckActions.deselectCard, (state: PlanningPokerStoreStateModel, action: ActionType<any>) => {
  const newState: PlanningPokerStoreStateModel = cloneDeep(state);
  if (newState.session.data) {
    const cardFound = newState.session.data.deck.cards.find(card => card.value === action.value);
    if (cardFound) {
      cardFound.selected = false;
    }
  }
  return newState;
});
