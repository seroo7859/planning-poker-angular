import { BacklogEffects, SessionEffects, TeamEffects, UserEffects } from "./index";

export const effects = [
  SessionEffects.SessionEffects,
  UserEffects.UserEffects,
  TeamEffects.TeamEffects,
  BacklogEffects.BacklogEffects
];
