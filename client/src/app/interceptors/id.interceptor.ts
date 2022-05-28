import {
 HttpEvent,
 HttpHandler,
 HttpInterceptor,
 HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class IdInterceptor implements HttpInterceptor {

   intercept(req: HttpRequest<any>,
             next: HttpHandler): Observable<HttpEvent<any>> {

       const idToken = localStorage.getItem("user_id");
       if (idToken) {
        console.log('idToken', idToken)
           const cloned = req.clone({
               headers: req.headers.set("user_id", idToken)
               
               
           })
           return next.handle(cloned);
       }
       else {
           return next.handle(req);
       }
       

   }
}