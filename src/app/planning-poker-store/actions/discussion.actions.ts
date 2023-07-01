import { createAction, props } from '@ngrx/store';
import { ActionTypes } from "./planning-poker-store.actions";


// Collapse Backlog Action

export const collapseDiscussion = createAction(
  ActionTypes.CollapseDiscussion
);
