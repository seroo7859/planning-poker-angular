import { DeckCardModel } from "./deck.model";
import { TeamMemberModel } from "./team.model";

export interface EstimationRoundModel {
  backlogItemNumber: string;
  startedAt: string;
  finishedAt?: string;
  estimations: EstimationModel[];
}

export interface EstimationModel {
  estimationValue: string;
  estimator: string;
  createdAt: string;
  updatedAt: string;
}

export interface EstimationRecordModel {
  card: DeckCardModel,
  estimator: TeamMemberModel;
}

export interface EstimationSummaryModel {
  backlogItemNumber: string;
  startedAt: string;
  finishedAt?: string;
  duration: string;
  totalEstimators: number;
  numberOfEstimators: number;
  consensusReached: boolean;
  recommendation: string;
  estimationResults: EstimationResultModel[];
}

export interface EstimationResultModel {
  estimationValue: string;
  estimators: string[];
}
