import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { SessionCreateModel, SessionJoinModel, SessionModel } from "../models/session.model";
import { AuthService } from "./auth.service";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  // URL to Session-API
  private url = 'api/session';

  // HTTP Options
  private httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  constructor(private http: HttpClient, private authService: AuthService) {}

  /**
   * Create a new session on the server.
   * @param session
   */
  createSession(session: SessionCreateModel): Observable<SessionModel> {
    return this.http.post<SessionModel>(this.url, session, { observe: 'response', ...this.httpOptions })
      .pipe(
        tap(response => this.authService.handleResponse(response)),
        map(response => response.body as SessionModel)
      );
  }

  /**
   * Join to a session on the server.
   * @param session
   */
  joinSession(session: SessionJoinModel): Observable<SessionModel> {
    const { sessionId, ...data } = session;
    return this.http.post<SessionModel>(`${this.url}/${session.sessionId}/join`, data, { observe: 'response', ...this.httpOptions })
      .pipe(
        tap(response => this.authService.handleResponse(response)),
        map(response => response.body as SessionModel)
      );
  }

  /**
   * Leave a session by public id on the server.
   * @param sessionId
   */
  leaveSession(sessionId: string): Observable<SessionModel> {
    return this.http.post<SessionModel>(`${this.url}/${sessionId}/leave`, {}, { observe: 'response', ...this.httpOptions })
      .pipe(
        tap(response => this.authService.removeAuthorizationToken()),
        map(response => response.body as SessionModel)
      );
  }

  /**
   * Get a session by public id from server.
   * @param sessionId
   */
  getSession(sessionId: string): Observable<SessionModel> {
    return this.http.get<SessionModel>(`${this.url}/${sessionId}`, this.httpOptions);
  }

}
