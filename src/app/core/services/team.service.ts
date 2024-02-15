import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { TeamModel } from "../models/team.model";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  // URL to Team-API
  private url = `${environment.production ? environment.apiUrl : 'api'}/team`;

  // HTTP Options
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  /**
   * Get the team on the session.
   * @param sessionId
   */
  getTeam(sessionId: string): Observable<TeamModel> {
    return this.http.get<TeamModel>(`${this.url}/${sessionId}`, this.httpOptions);
  }

  /**
   * Rename the team on the session.
   * @param sessionId
   * @param newName
   */
  renameTeam(sessionId: string, newName: string): Observable<TeamModel> {
    return this.http.patch<TeamModel>(`${this.url}/rename?sessionId=${sessionId}`, { name: newName }, this.httpOptions);
  }

}
