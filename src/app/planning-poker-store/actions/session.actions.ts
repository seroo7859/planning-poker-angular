import { createAction, props } from '@ngrx/store';
import { SessionCreateModel, SessionJoinModel, SessionModel } from "../../core/models/session.model";
import { ActionTypes } from "./planning-poker-store.actions";
import { HttpErrorResponse } from "@angular/common/http";


// Create Session Actions

export const createSession = createAction(
  ActionTypes.CreateSession,
  props<{ session: SessionCreateModel }>()
);

export const createSessionSuccess = createAction(
  ActionTypes.CreateSessionSuccess,
  props<{ session: SessionModel }>()
);

export const createSessionFailure = createAction(
  ActionTypes.CreateSessionFailure,
  props<{ error: HttpErrorResponse }>()
);


// Join Session Actions

export const joinSession = createAction(
  ActionTypes.JoinSession,
  props<{ session: SessionJoinModel }>()
);

export const joinSessionSuccess = createAction(
  ActionTypes.JoinSessionSuccess,
  props<{ session: SessionModel }>()
);

export const joinSessionFailure = createAction(
  ActionTypes.JoinSessionFailure,
  props<{ error: HttpErrorResponse }>()
);


// Get Session Actions

export const getSession = createAction(
  ActionTypes.GetSession,
  props<{ sessionId: string }>()
);

export const getSessionSuccess = createAction(
  ActionTypes.GetSessionSuccess,
  props<{ session: SessionModel }>()
);

export const getSessionFailure = createAction(
  ActionTypes.GetSessionFailure,
  props<{ sessionId: string, error: HttpErrorResponse }>()
);
