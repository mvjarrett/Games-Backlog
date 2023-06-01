import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const jwt = localStorage.getItem('token');
    const idToken = localStorage.getItem('user_id');
    const igdb_id = localStorage.getItem('igdb_id');
    const igdb_token = localStorage.getItem('igdb_token');
    if (jwt && idToken && igdb_id && igdb_token) {
      const cloned = req.clone({
        headers: req.headers
          .set('jwt', jwt)
          .set('user_id', idToken)
          .set('Client-ID', igdb_id)
          .set('Authorization', igdb_token)
          .set('Access-Control-Allow-Origin', '*'),
      });
      return next.handle(cloned);
    } else {
      console.error('auth.int if statement returned false');
      return next.handle(req);
    }
  }
}
