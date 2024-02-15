import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { DiscussionModel, DiscussionPostCreateModel, DiscussionPostModel } from "../models/discussion.model";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DiscussionService {

  // URL to Discussion-API
  private url = `${environment.production ? environment.apiUrl : 'api'}/discussion`;

  // HTTP Options
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  /**
   * Get the discussion in the session.
   * @param sessionId
   */
  getDiscussion(sessionId: string): Observable<DiscussionModel> {
    return this.http.get<DiscussionModel>(`${this.url}?sessionId=${sessionId}`, this.httpOptions);
  }

  /**
   * Start a discussion in the session.
   * @param sessionId
   * @param topic
   */
  startDiscussion(sessionId: string, topic: string): Observable<DiscussionModel> {
    return this.http.post<DiscussionModel>(`${this.url}/start?sessionId=${sessionId}`, { topic }, this.httpOptions);
  }

  /**
   * End a discussion in the session.
   * @param sessionId
   */
  endDiscussion(sessionId: string): Observable<DiscussionModel> {
    return this.http.post<DiscussionModel>(`${this.url}/end?sessionId=${sessionId}`, { }, this.httpOptions);
  }

  /**
   * Create a discussion post in the session.
   * @param sessionId
   * @param newDiscussionPost
   */
  createDiscussionPost(sessionId: string, newDiscussionPost: DiscussionPostCreateModel): Observable<DiscussionPostModel> {
    return this.http.post<DiscussionPostModel>(`${this.url}/post?sessionId=${sessionId}`, newDiscussionPost, this.httpOptions);
  }

}
