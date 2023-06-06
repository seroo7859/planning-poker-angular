import { ActionReducer, ActionReducerMap, MetaReducer } from "@ngrx/store";
import { PlanningPokerStoreStateModel } from "./model/planning-poker-store.state.model";
import { reducer, storeFeatureKey } from "../reducers/planning-poker-store.reducers";

export interface AppState {
  [storeFeatureKey]: PlanningPokerStoreStateModel;
}

export const reducers: ActionReducerMap<AppState> = {
  [storeFeatureKey]: reducer
};

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<AppState>[] = [debug];
