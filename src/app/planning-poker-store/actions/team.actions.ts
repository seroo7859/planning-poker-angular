import { createAction, props } from '@ngrx/store';
import { ActionTypes } from "./planning-poker-store.actions";
import { TeamMemberModel, TeamModel } from "../../core/models/team.model";
import { HttpErrorResponse } from "@angular/common/http";


// Rename Team Actions

export const renameTeam = createAction(
  ActionTypes.RenameTeam,
  props<{ name: string }>()
);

export const renameTeamSuccess = createAction(
  ActionTypes.RenameTeamSuccess,
  props<{ team: TeamModel }>()
);

export const renameTeamFailure = createAction(
  ActionTypes.RenameTeamFailure,
  props<{ error: HttpErrorResponse }>()
);

export const teamRenamed = createAction(
  ActionTypes.TeamRenamed,
  props<{ name: string }>()
);


// Team Member Actions

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
