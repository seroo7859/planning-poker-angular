import { createAction, props } from '@ngrx/store';
import { ActionTypes } from "./planning-poker-store.actions";

export const selectCard = createAction(
  ActionTypes.SelectCard,
  props<{ value: string }>()
);

export const deselectCard = createAction(
  ActionTypes.DeselectCard,
  props<{ value: string }>()
);
