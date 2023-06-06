import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PlanningPokerStoreStateModel } from "../state/model/planning-poker-store.state.model";
import { storeFeatureKey } from "../reducers/planning-poker-store.reducers";

const selectPlanningPokerStoreState = createFeatureSelector<PlanningPokerStoreStateModel>(storeFeatureKey);

export const selectSession = createSelector(selectPlanningPokerStoreState, (state: PlanningPokerStoreStateModel) => state.session);
