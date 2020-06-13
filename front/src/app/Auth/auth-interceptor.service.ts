import {Injectable, Injector} from '@angular/core';
import {HttpInterceptor} from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError, mergeMap} from 'rxjs/operators';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private injector: Injector) {
  }

  intercept(req, next) {
    const authS = this.injector.get(AuthService);
    if (authS.getToken) {
      req = req.clone({
        setHeaders: {Authorization: `Bearer ${authS.getToken()}`}
      });
      return next.handle(req).pipe(
        catchError(err => {
          if (err.status === 401 && err.error.message === 'jwt expired') {
            console.log('token expired');
            return authS.refreshToken().pipe(
              mergeMap((data: any) => {
                console.log('access token refreshed:', data.accessToken !== null);
                authS.setToken(data);
                req = req.clone({
                  setHeaders: {Authorization: `Bearer ${data.accessToken}`}
                });
                console.log('resending request ...');
                return next.handle(req).pipe(
                  catchError(err2 => {
                    console.log('this error should be handled', err2);
                    throw throwError('error2', err2);
                  }));
              }),
              catchError(err3 => {
                return throwError('refresh token expired too logging-out...', err3); //  TODO log out
              })
            );
          }
          return throwError(err);
        })
      );
    }
  }
}
