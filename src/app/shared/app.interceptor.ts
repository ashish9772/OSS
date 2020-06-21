import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpParams, HttpHeaders } from '@angular/common/http';
import { LoginService } from '../service/login.service';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { tap, finalize } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
    count = 0;
    constructor(private loginService: LoginService, private spinner: NgxSpinnerService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
        this.spinner.show();
        this.count++;
        const request = req.clone({
            setHeaders: {
                'content-type': 'application/json'
            },

        });
        return next.handle(request)
            .pipe(tap(
                event => (event),
                error => (error)
            ), finalize(() => {
                this.count--;
                if (this.count === 0) { this.spinner.hide(); }
            })
            );
    }
}


