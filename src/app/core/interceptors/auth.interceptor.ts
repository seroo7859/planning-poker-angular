import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the auth token from the service
    const authToken = this.auth.getAuthorizationToken();

    // If the token is not present, then call the next handler with the unmodified request
    if (!authToken) {
      return next.handle(request)
    }

    // Clone the request and set the authorization header
    const authRequest = request.clone(
      { setHeaders: { Authorization: `Bearer ${authToken}` } }
    );

    // Send cloned request with authorization header to the next handler
    return next.handle(authRequest);
  }
}
