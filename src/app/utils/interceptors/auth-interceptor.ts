import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthService } from "src/app/services/auth/auth.service";
import { catchError, mergeMap, retry, switchMap } from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      this.isWhiteList(req.url) &&
      !this.isBlackList(req.url) &&
      this.authService.getToken()
    ) {
      return next.handle(this.updateHeader(req)).pipe(
        catchError((err: HttpErrorResponse) => {
          if (
            err.status === 403 ||
            (err.status === 401 && err.error.error === "invalid_token")
          ) {
            return this.authService
              .handleRefreshToken()
              .pipe(switchMap(() => next.handle(this.updateHeader(req))));
          }

          return throwError(err);
        })
      );
    } else {
      return next.handle(req);
    }
  }

  private isBlackList(url: string) {
    if (url.includes(`${environment.apiUrl}/oauth/token`)) {
      return true;
    }

    if (url.includes(`${environment.apiUrl}/customer-user/sign-up`)) {
      return true;
    }

    if (url.includes(`${environment.apiUrl}/customer-user/reset-password`)) {
      return true;
    }

    return false;
  }

  private isWhiteList(url: string) {
    return url.includes(environment.apiUrl);
  }

  private updateHeader(req) {
    return req.clone({
      headers: req.headers.set(
        "Authorization",
        `Bearer ${this.authService.getToken()}`
      ),
    });
  }
}
