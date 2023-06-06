import { DeckModel } from "../../../core/models/deck.model";
import { XhrStateModel } from "./xhr.state.model";
import { SessionModel } from "../../../core/models/session.model";
import { UserModel } from "../../../core/models/user.model";

export interface PlanningPokerStoreStateModel {
  user: UserModel | null,
  decks: DeckModel[],
  session: {
    data: SessionModel | null,
    xhr: XhrStateModel
  }
}
