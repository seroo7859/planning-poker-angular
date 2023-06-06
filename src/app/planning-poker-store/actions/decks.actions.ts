import { createAction, props } from '@ngrx/store';
import { DeckModel } from "../../core/models/deck.model";
import {ActionTypes} from "./planning-poker-store.actions";
export const addDeck = createAction(
  ActionTypes.AddDeck,
  props<{ deck: DeckModel }>()
);
