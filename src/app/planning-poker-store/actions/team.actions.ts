import { createAction, props } from '@ngrx/store';
import { ActionTypes } from "./planning-poker-store.actions";
import { TeamMemberModel } from "../../core/models/team.model";

export const teamMemberJoined = createAction(
  ActionTypes.TeamMemberJoined,
  props<{ teamMember: TeamMemberModel }>()
);

export const teamMemberLeaved = createAction(
  ActionTypes.TeamMemberLeaved,
  props<{ teamMember: TeamMemberModel }>()
);

export const teamMemberConnected = createAction(
  ActionTypes.TeamMemberConnected,
  props<{ teamMember: TeamMemberModel }>()
);

export const teamMemberDisconnected = createAction(
  ActionTypes.TeamMemberDisconnected,
  props<{ teamMember: TeamMemberModel }>()
);
