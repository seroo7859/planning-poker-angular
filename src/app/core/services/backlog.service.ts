import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import {
  BacklogExportModel,
  BacklogItemAddModel,
  BacklogItemModel,
  BacklogItemUpdateModel,
  BacklogModel
} from "../models/backlog.model";
import { map } from "rxjs/operators";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BacklogService {

  // URL to Backlog-API
  private url = `${environment.production ? environment.apiUrl : 'api'}/backlog`;

  // HTTP Options
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  /**
   * Import the backlog to the session.
   * @param sessionId
   * @param backlogFile
   */
  importBacklog(sessionId: string, backlogFile: File): Observable<BacklogModel> {
    const formData: FormData = new FormData();
    formData.append('file', backlogFile, backlogFile.name);
    return this.http.post<BacklogModel>(`${this.url}/import?sessionId=${sessionId}`, formData);
  }

  /**
   * Export the backlog from the session.
   * @param sessionId
   */
  exportBacklog(sessionId: string): Observable<BacklogExportModel> {
    const getFilenameFromContentDisposition = (response: HttpResponse<any>) => {
      return response.headers.get('content-disposition')?.split(';')[1].split('=')[1].replaceAll('"', '');
    };
    return this.http.get(`${this.url}/export?sessionId=${sessionId}`, { observe: 'response', responseType: 'blob' })
      .pipe(
        map(response => ({ filename: getFilenameFromContentDisposition(response), data: response.body }) as BacklogExportModel),
      );
  }

  /**
   * Rename the backlog on the session.
   * @param sessionId
   * @param newName
   */
  renameBacklog(sessionId: string, newName: string): Observable<BacklogModel> {
    return this.http.patch<BacklogModel>(`${this.url}/rename?sessionId=${sessionId}`, { name: newName }, this.httpOptions);
  }

  /**
   * Remove all backlog items on the session.
   * @param sessionId
   */
  clearBacklog(sessionId: string): Observable<any> {
    return this.http.delete<BacklogModel>(`${this.url}/clear?sessionId=${sessionId}`, this.httpOptions);
  }

  /**
   * Add a new backlog item to backlog.
   * @param sessionId
   * @param newBacklogItem
   */
  addBacklogItem(sessionId: string, newBacklogItem: BacklogItemAddModel): Observable<BacklogItemModel> {
    return this.http.post<BacklogItemModel>(`${this.url}/item?sessionId=${sessionId}`, newBacklogItem, this.httpOptions);
  }

  /**
   * Remove the backlog item from backlog.
   * @param sessionId
   * @param backlogItemNumber
   */
  removeBacklogItem(sessionId: string, backlogItemNumber: string): Observable<any> {
    return this.http.delete(`${this.url}/item/${backlogItemNumber}?sessionId=${sessionId}`, this.httpOptions);
  }

  /**
   * Update the backlog item on backlog.
   * @param sessionId
   * @param backlogItemNumber
   * @param backlogItemUpdate
   */
  updateBacklogItem(sessionId: string, backlogItemNumber: string, backlogItemUpdate: BacklogItemUpdateModel): Observable<BacklogItemModel> {
    return this.http.put<BacklogItemModel>(`${this.url}/item/${backlogItemNumber}?sessionId=${sessionId}`, backlogItemUpdate, this.httpOptions);
  }

  /**
   * Move the backlog item to new index on backlog.
   * @param sessionId
   * @param backlogItemNumber
   * @param newIndex
   */
  moveBacklogItem(sessionId: string, backlogItemNumber: string, newIndex: number): Observable<BacklogItemModel[]> {
    return this.http.post<BacklogItemModel[]>(`${this.url}/item/${backlogItemNumber}/move?sessionId=${sessionId}`, { newIndex }, this.httpOptions);
  }

}
