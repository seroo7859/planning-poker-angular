import { createAction, props } from '@ngrx/store';
import { ActionTypes } from "./planning-poker-store.actions";
import { UserModel } from "../../core/models/user.model";

// Get Current User Actions

export const getCurrentUser = createAction(
  ActionTypes.GetCurrentUser
);

export const getCurrentUserSuccess = createAction(
  ActionTypes.GetCurrentUserSuccess,
  props<{ user: UserModel }>()
);

export const getCurrentUserFailure = createAction(
  ActionTypes.GetCurrentUserFailure,
  props<{ error: Error }>()
);

// Current User Connection Actions

export const currentUserConnected = createAction(
  ActionTypes.CurrentUserConnected
);

export const currentUserDisconnected = createAction(
  ActionTypes.CurrentUserDisconnected
);
