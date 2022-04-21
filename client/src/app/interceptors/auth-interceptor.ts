import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders
} from '@angular/common/http';

import { Observable } from 'rxjs';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
      const authReq = req.clone({
        setHeaders:({
          'Access-Control-Allow-Origin': '*',
          'Content-Type':  'application/json',
          'Authorization': 'my-auth-token'
        })
      });
    
      console.log('Intercepted HTTP call', authReq);
    
      return next.handle(authReq);
    }
  };