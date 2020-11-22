import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { LoginDataService } from '../login-data.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorBasicAuthServiceService implements HttpInterceptor {

  constructor(private loginDataService: LoginDataService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {

    let basicAuthHeadersString = this.loginDataService.getAuthenticatedToken();
    let userName = this.loginDataService.getAuthenticatedUser();

    console.log("___ TOKEN ____ " + basicAuthHeadersString)
    console.log("user____ " + userName)

    if (basicAuthHeadersString && userName) {
      request = request.clone({
        setHeaders: {
          Authorization: basicAuthHeadersString
        }
      })
    }
    return next.handle(request);

  }
}
