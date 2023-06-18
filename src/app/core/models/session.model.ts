import { DeckModel } from "./deck.model";
import { TeamModel } from "./team.model";
import { BacklogModel } from "./backlog.model";

export interface SessionModel {
  id: string;
  team: TeamModel;
  deck: DeckModel;
  backlog: BacklogModel;
  createdAt: string;
}

export interface SessionCreateModel {
  team: string,
  username: string,
  deck: DeckModel
}

export interface SessionJoinModel {
  sessionId: string,
  username: string,
  spectator: boolean
}
