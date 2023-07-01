import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { EstimationModel, EstimationRoundModel, EstimationSummaryModel } from "../models/estimation.model";

@Injectable({
  providedIn: 'root'
})
export class EstimationService {

  // URL to Estimation-API
  private url = 'api/estimation';

  // HTTP Options
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  /**
   * Start a new estimation round for the backlog item in the session.
   * @param sessionId
   * @param backlogItemNumber
   */
  startEstimationRound(sessionId: string, backlogItemNumber: string): Observable<EstimationRoundModel> {
    return this.http.post<EstimationRoundModel>(`${this.url}/round/start?sessionId=${sessionId}`, { backlogItemNumber }, this.httpOptions);
  }

  /**
   * Start the next estimation round in the session.
   * @param sessionId
   */
  nextEstimationRound(sessionId: string): Observable<EstimationRoundModel> {
    return this.http.post<EstimationRoundModel>(`${this.url}/round/next?sessionId=${sessionId}`, { }, this.httpOptions);
  }

  /**
   * Finish the estimation round for the current backlog item in the session.
   * @param sessionId
   */
  finishEstimationRound(sessionId: string): Observable<EstimationRoundModel> {
    return this.http.post<EstimationRoundModel>(`${this.url}/round/finish?sessionId=${sessionId}`, { }, this.httpOptions);
  }

  /**
   * Get the current estimation round in the session.
   * @param sessionId
   */
  getEstimationRound(sessionId: string): Observable<EstimationRoundModel> {
    return this.http.get<EstimationRoundModel>(`${this.url}/round/info?sessionId=${sessionId}`, this.httpOptions);
  }

  /**
   * Get the summary of the estimation round in the session.
   * @param sessionId
   */
  getEstimationSummary(sessionId: string): Observable<EstimationSummaryModel> {
    return this.http.get<EstimationSummaryModel>(`${this.url}/round/summary?sessionId=${sessionId}`, this.httpOptions);
  }

  /**
   * Give an estimation in the current estimation round.
   * @param sessionId
   * @param estimationValue
   */
  giveEstimation(sessionId: string, estimationValue: string): Observable<EstimationModel> {
    return this.http.post<EstimationModel>(`${this.url}/give?sessionId=${sessionId}`, { estimationValue }, this.httpOptions);
  }

}
