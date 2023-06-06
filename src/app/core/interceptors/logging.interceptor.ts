import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import { finalize, Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Define the moment the request was intercepted and store whether the operation was successful or failed
    const started: number = Date.now();
    let status: string;

    // Handle request
    return next.handle(request)
      .pipe(
        tap(
          {
            // Operation succeeded
            next: (event) => (status = event instanceof HttpResponse ? 'succeeded' : ''),
            // Operation failed
            error: (error) => (status = 'failed')
          }
        ),
        // Log when observable returning a success or an error response
        finalize(() => {
          // Calculate how long the request took in total
          const ended: number = Date.now();
          const elapsed: number = ended - started;

          // Create a message and log to console
          const message: string = `${request.method} "${request.urlWithParams}" ${status} in ${elapsed} ms.`;
          console.log(message);
        })
      );
  }
}
