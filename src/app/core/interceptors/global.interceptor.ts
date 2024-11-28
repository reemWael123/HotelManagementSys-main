import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const baseUrl = 'https://upskilling-egypt.com:3000/api/v0';
    const accessToken = localStorage.getItem('userToken') ?? '';

    let newRequest = request.clone({
      url: request.url.includes( 'assets' ) ? request.url :
        baseUrl + '/' + request.url,
      headers: request.headers.set('Authorization', accessToken),
    });

    return next.handle(newRequest);
  }
}
// 65ab7b10e815336ace2064d8