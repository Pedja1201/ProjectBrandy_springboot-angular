import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../service/auth/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private loginService : LoginService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.addAuthToken(request));
  }

  addAuthToken(request: HttpRequest<any>) {
    const token = localStorage.getItem('Token');

    return request.clone({
        setHeaders: {
          Authorization: `${token}`
        }
    })
  }
}
