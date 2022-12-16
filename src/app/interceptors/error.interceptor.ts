import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";
import { Router } from '@angular/router';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
 constructor(
  private route: Router
) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                //success
                console.log('Success');
            }
        },
            (error: any) => {
                if (error instanceof HttpErrorResponse) {
                    if (error.status === 401) {
                        console.log('not Logged In');
                        this.route.navigate(['/login'])
                    }
                    if (error.status === 404) {
                        console.log('Not found');
                    }
                    if (error.status === 403) {
                        console.log(error)
                     this.route.navigate(['/login'])
                    }
                    //etc
                }
            }
        ))
    }
}