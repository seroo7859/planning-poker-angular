export interface UserModel {
  name: string;
  active: boolean;
  role: UserRoleModel;
}

export enum UserRoleModel {
  MODERATOR = "MODERATOR",
  PARTICIPANT = "PARTICIPANT",
  SPECTATOR = "SPECTATOR"
}
