import { Action, createReducer } from "@ngrx/store";
import { planningPokerStateInitial } from "../state/model/planning-poker.state.initial";
import { PlanningPokerStateModel } from "../state/model/planning-poker.state.model";

export const storeFeatureKey = 'planning-poker-store';

const planningPokerReducers = createReducer(
  planningPokerStateInitial,
  // reducers ...
);

export const reducer = (state: PlanningPokerStateModel | undefined, action: Action): any => planningPokerReducers(state, action);
