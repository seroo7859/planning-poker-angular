export interface TeamModel {
  name: string;
  members: TeamMemberModel[];
}

export interface TeamMemberModel {
  name: string;
  active: boolean;
  role: TeamMemberRoleModel;
}

export enum TeamMemberRoleModel {
  MODERATOR = "MODERATOR",
  PARTICIPANT = "PARTICIPANT",
  SPECTATOR = "SPECTATOR"
}
