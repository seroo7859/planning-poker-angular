import { BacklogEffects, SessionEffects, TeamEffects, UserEffects, EstimationEffects, DeckEffects } from "./index";

export const effects = [
  SessionEffects.SessionEffects,
  UserEffects.UserEffects,
  TeamEffects.TeamEffects,
  BacklogEffects.BacklogEffects,
  EstimationEffects.EstimationEffects,
  DeckEffects.DeckEffects
];
