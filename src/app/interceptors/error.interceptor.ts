import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private route: Router) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            //success
          }
        },
        (error: any) => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {
              console.error('not Logged In');
              this.route.navigate(['/login']);
            }
            if (error.status === 404) {
              console.error('Not found');
            }
            if (error.status === 403) {
              console.error(error);
              this.route.navigate(['/login']);
            }
            //etc
          }
        }
      )
    );
  }
}
