import {Injectable} from '@angular/core';
import {Actions, Effect, ofType, ROOT_EFFECTS_INIT} from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import * as Auth_Actions from '../actions/auth.actions';
import {AuthService} from '../../services/auth.service';


@Injectable()
export class AuthEffects {

    // AUTHENTICATION EFFECTS =============================================================================
    @Effect()
    LogIn: Observable<any> = this.actions$.pipe(
        ofType(Auth_Actions.AuthActionTypes.LOGIN),
        map((action: Auth_Actions.LogIn) => action.payload),
        switchMap(payload => {
            return this.authService.login(payload).pipe(
                map(() => new Auth_Actions.UserInfo({message: 'auth:Login success', authenticated: true})),
                catchError((err) => {
                    return of(new Auth_Actions.Failure({message: 'auth:code' + err.error.code, error: err}));
                }));
        }));

    @Effect()
    SignUp: Observable<any> = this.actions$.pipe(
        ofType(Auth_Actions.AuthActionTypes.SIGNUP),
        map((action: Auth_Actions.SignUp) => action.payload),
        switchMap(payload => {
            return this.authService.signup(payload).pipe(
                map(() => new Auth_Actions.UserInfo({message: 'auth:signup success', authenticated: true})),
                catchError((err) => {
                    return of(new Auth_Actions.Failure({message: 'auth:code' + err.error.code, error: err}));
                }));
        }));

    @Effect()
    LogOut: Observable<any> = this.actions$.pipe(
        ofType(Auth_Actions.AuthActionTypes.LOGOUT),
        switchMap(() => {
            return this.authService.logout().pipe(
                tap(() => this.authService.remToken()),
                map(() => new Auth_Actions.Success({message: 'auth:logout success', authenticated: false})),
                catchError(err => {
                    return of(new Auth_Actions.Failure({message: 'auth:code' + err.error.code, error: err}));
                })
            );
        })
    );

    // EDITING USER INFO EFFECTS =========================================================================
    @Effect()
    EditUserInfo: Observable<any> = this.actions$.pipe(
        ofType(Auth_Actions.AuthActionTypes.USER_EDIT_INFO),
        map((action: Auth_Actions.UserEditInfo) => action.payload),
        switchMap(payload => {
            return this.authService.editUserInfo(payload).pipe(
                map(() => new Auth_Actions.UserInfo({message: 'userInfo: User info updated successfully'})),
                catchError(err => { // todo log error
                    return of(new Auth_Actions.Failure({message: `userInfo: ${err.error.message}`, error: err}));
                }));
        }));

    @Effect()
    EditUserPassword: Observable<any> = this.actions$.pipe(
        ofType(Auth_Actions.AuthActionTypes.USER_EDIT_PWD),
        map((action: Auth_Actions.UserEditPWD) => action.payload),
        switchMap(payload => {
            return this.authService.editUserPassword(payload).pipe(
                map(() => new Auth_Actions.UserInfo({message: 'userInfo: Password updated successfully'})),
                catchError(err => { // todo log error
                    return of(new Auth_Actions.Failure({message: `userInfo: ${err.error.message}`, error: err}));
                }));
        }));


    // GETTING USER INFO EFFECTS  =========================================================================
    @Effect()
    UserInfo: Observable<any> = this.actions$.pipe(
        ofType<Auth_Actions.UserInfo>(Auth_Actions.AuthActionTypes.USER_INFO),
        map((action: Auth_Actions.UserInfo) => action.payload),
        switchMap(payload => {
            return this.authService.getUserInfo().pipe(
                map((res) => new Auth_Actions.Success({userInfo: res, ...payload})),
                catchError((err) => {
                    return of(new Auth_Actions.Failure({message: 'user:Loading user info error', error: err}));
                }));
        }));

    @Effect()
    init$ = this.actions$.pipe(
        ofType(ROOT_EFFECTS_INIT),
        switchMap(() => [
            new Auth_Actions.InitState({
                isAuthenticated: this.authService.isLoggedIn(),
                user: null,
                SuccessMessage: null,
                FailureMessage: null
            }),
            new Auth_Actions.UserInfo({message: 'user: authState initiated successfully'})
        ]),
        catchError((err) => {
            return of(new Auth_Actions.Failure({message: 'user:authState initiation error', error: err}));
        })
    );

    constructor(
        private actions$: Actions,
        private authService: AuthService
    ) {
    }

}
