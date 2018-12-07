import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { IHttpResponse } from '../contracts';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .pipe(
                map((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        const httpResponse: IHttpResponse = event.body;

                        if (typeof httpResponse === 'object' && typeof httpResponse['code'] !== 'undefined') {
                            if (httpResponse.code === 200) {
                                if (typeof httpResponse['pagination'] !== 'undefined') {
                                    return event.clone({
                                        body: {
                                            data: httpResponse.data,
                                            pagination: httpResponse['pagination']
                                        }
                                    });
                                }
                                else {
                                    return event.clone({
                                        body: httpResponse.data
                                    });
                                }
                            }
                            else {
                                throwError(httpResponse);
                            }
                        }
                    }

                    return event;
                }),
                catchError(error => {
                    if (error instanceof HttpErrorResponse) {
                        if (typeof error.error['msg'] !== 'undefined') {
                            return throwError(error.error);
                        }
                        else {
                            return throwError({
                                msg: error.statusText,
                                code: error.status,
                                data: error.message
                            });
                        }
                    }
                    else {
                        return throwError({
                            // tslint:disable-next-line:max-line-length
                            msg: typeof error.statusText !== 'undefined' && error.statusText !== '' ? error.statusText : 'Invalid response from server',
                            data: null,
                            code: 500
                        });
                    }
                })
            );
    }
}
