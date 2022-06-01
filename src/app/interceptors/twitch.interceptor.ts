import {
 HttpEvent,
 HttpHandler,
 HttpInterceptor,
 HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TwitchInterceptor implements HttpInterceptor {

   intercept(req: HttpRequest<any>,
             next: HttpHandler): Observable<HttpEvent<any>> {

       const idToken = localStorage.getItem("user_id");
       if (idToken) {
           const cloned = req.clone({
               headers: req.headers.set("Client-id", <string>process.env['AUTH_ID'])
               .set("Authorization", <string>process.env['AUTH_TOKEN']),
               
               
           })
           return next.handle(cloned);
       }
       else {
           return next.handle(req);
       }
       

   }
}