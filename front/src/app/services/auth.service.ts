import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import {EMPTY, Observable} from 'rxjs';

export const ACC_TOKEN_NAME = 'tg-access-token';
export const REF_TOKEN_NAME = 'tg-refresh-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASE_URL = 'http://51.91.79.72:3000';

  refreshToken() {
    return this.http.post(`${this.BASE_URL}/auth/token/refresh`, {refreshToken: this.getToken(REF_TOKEN_NAME)});
  }

  getToken(name = ACC_TOKEN_NAME) {
    return localStorage.getItem(name);
  }

  setToken(res: any): void {
    localStorage.setItem(ACC_TOKEN_NAME, res.accessToken);
    if (res.refreshToken) { localStorage.setItem(REF_TOKEN_NAME, res.refreshToken); }
  }

  remToken(name = ACC_TOKEN_NAME) {
    localStorage.removeItem(name);
  }

  getTokenExpirationDate(token: string): Date {
    const decodedToken = jwt_decode(token);
    if (decodedToken.exp === undefined) { return null; }
    const date = new Date(0);
    date.setUTCSeconds(decodedToken.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) { token = this.getToken(); }
    if (!token) { return true; }
    const date = this.getTokenExpirationDate(token);
    if (date === undefined) { return false; }
    return !(date.valueOf() > new Date().valueOf());
  }

  signup(data) {
    return this.http.post<any>(`${this.BASE_URL}/auth/signUp`, data)
      .pipe(tap(res => { this.setToken(res); }));
  }

  login(data) {
    return this.http.post<any>(`${this.BASE_URL}/auth/login`, data).pipe(
      tap(res => {this.setToken(res); })
    );
  }

  logout() {
    return this.http.post(`${this.BASE_URL}/auth/logout`, {refreshToken: this.getToken(REF_TOKEN_NAME)});
  }

  public isLoggedIn() {
    return !this.isTokenExpired();
  }

  // USER MANAGEMENT ===================================================================================================================== >
  getUserInfo() {
    if (this.isLoggedIn()) {
      return this.http.get<any>(`${this.BASE_URL}/user`);
    } else { return EMPTY; }
  }

  editUserInfo(info) {
    return this.http.put<any>(`${this.BASE_URL}/user`, info);
  }

  editUserPassword(info) {
    return this.http.put<any>(`${this.BASE_URL}/user/password`, info);
  }

  constructor(private http: HttpClient) { }
}
