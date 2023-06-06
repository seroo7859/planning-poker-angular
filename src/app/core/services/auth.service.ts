import { Injectable } from '@angular/core';
import { HttpResponse } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { UserModel, UserRoleModel } from "../models/user.model";
import jwtDecode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly AUTH_TOKEN_HEADER: string = 'X-Token';
  private readonly AUTH_TOKEN_STORAGE: string = 'auth_token';

  isAuthenticated$: BehaviorSubject<boolean>;

  constructor() {
    this.isAuthenticated$ = new BehaviorSubject(this.isAuthenticated());
  }

  handleResponse(response: HttpResponse<any>) {
    const authToken = response.headers.get(this.AUTH_TOKEN_HEADER);
    if (authToken) {
      this.setAuthorizationToken(authToken);
    }
  }

  isAuthenticated(): boolean {
    return !!this.getAuthorizationToken();
  }

  getAuthorizationToken(): string | null {
    return localStorage.getItem(this.AUTH_TOKEN_STORAGE);
  }

  private setAuthorizationToken(authToken: string) {
    localStorage.setItem(this.AUTH_TOKEN_STORAGE, authToken);
    this.isAuthenticated$.next(true);
  }

  removeAuthorizationToken() {
    localStorage.removeItem(this.AUTH_TOKEN_STORAGE);
    this.isAuthenticated$.next(false);
  }

  getCurrentUser(): UserModel {
    const authToken = this.getAuthorizationToken();
    if (authToken === null) {
      throw new Error('No token');
    }
    const decodedToken: any = jwtDecode(authToken);
    return {
      name: decodedToken.name,
      active: false,
      role: decodedToken.role as UserRoleModel
    };
  }

}
