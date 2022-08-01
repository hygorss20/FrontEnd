import { HttpClient, HttpParams } from "@angular/common/http";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { environment } from "src/environments/environment";

import * as moment from "moment-timezone";
import { Router } from "@angular/router";
import { isPlatformBrowser } from "@angular/common";

declare var require: any;

const jwtDecode = require("jwt-decode");

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,

    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  handleLogin(email: string, password: string) {
    const username = JSON.stringify({
      type: "customer",
      email,
    });

    return this.http
      .post<{ access_token: string }>(
        `${environment.apiUrl}/oauth/token`,
        new HttpParams()
          .append("username", username)
          .append("password", password)
          .append("grant_type", "password"),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic YW5ndWxhcjo3RVAhQXFaMzZVJitQdVNn`,
          },
          withCredentials: true,
        }
      )
      .pipe(
        map((value) => {
          this.saveToken(value.access_token);
          return { auth: true };
        }),
        catchError((error) => {
          return of({ unauthorized: true });
        })
      );
  }

  handleRefreshToken() {
    return this.http
      .post<{ access_token: string }>(
        `${environment.apiUrl}/oauth/token`,
        new HttpParams().append("grant_type", "refresh_token"),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic YW5ndWxhcjo3RVAhQXFaMzZVJitQdVNn`,
          },
          withCredentials: true,
        }
      )
      .pipe(
        map((value) => {
          this.saveToken(value.access_token);
          return { auth: true };
        }),
        catchError((error) => {
          if (error.status === 401) {
            this.handleLogout();
          }

          return of({ unauthorized: true });
        })
      );
  }

  handleLogout(redirect = true) {
    this.removeToken();

    if (redirect) {
      this.router.navigate(["/sign-in"]);
    }
  }

  handleSignUp(name: string, email: string, password: string) {
    return this.http
      .post(`${environment.apiUrl}/customer-user/sign-up`, {
        name,
        email,
        password,
      })
      .pipe(
        switchMap((value) => this.handleLogin(email, password)),
        catchError((response) => {
          if (
            !!response &&
            !!response.error &&
            response.error.code === "user-already-exists"
          ) {
            return of({ existingAccount: true });
          }

          return of({ unauthorized: true });
        })
      );
  }

  recoveryPassword(email: string) {
    return this.http
      .put(`${environment.apiUrl}/customer-user/reset-password/${email}`, {})
      .pipe(
        catchError((error) => {
          return of(null);
        })
      );
  }

  isAuthenticated() {
    return (
      this.getToken() !== null &&
      this.getToken() !== undefined &&
      !this.isTokenExpired()
    );
  }

  isTokenExpired() {
    const token = this.getTokenPayload();
    const timezone = "Etc/GMT-0";
    return (
      !token ||
      moment.unix(token.exp).tz(timezone).isBefore(moment.tz(timezone))
    );
  }

  getTokenPayload() {
    const token = this.getToken();
    try {
      return jwtDecode(token);
    } catch (e) {
      return null;
    }
  }

  private saveToken(token: string) {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const key = btoa("token");
    localStorage.setItem(key, token);
  }

  getToken() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const key = btoa("token");
    return localStorage.getItem(key);
  }

  private removeToken() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const key = btoa("token");
    return localStorage.removeItem(key);
  }
}
