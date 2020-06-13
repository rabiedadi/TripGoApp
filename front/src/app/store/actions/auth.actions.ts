import {Action} from '@ngrx/store';
import {AuthState} from '../reducers/auth.reducers';

export enum AuthActionTypes {
  INIT_STATE = '[Auth] Init',
  LOGIN = '[Auth] Login',
  SIGNUP = '[Auth] Signup',
  LOGOUT = '[Auth] Logout',
  USER_INFO = '[USER] info',
  USER_EDIT_INFO = '[USER] edit info',
  USER_EDIT_PWD = '[USER] edit password',
  RESET_MESSAGES = '[USER] reset messages',
  SUCCESS = '[USER AUTH] success',
  FAILURE = '[USER AUTH] failure',
}

export class InitState implements Action {
  readonly type = AuthActionTypes.INIT_STATE;

  constructor(public payload: AuthState) {
  }
}

//  AUTHENTICATION ACTIONS ===================================================================

export class LogIn implements Action {
  readonly type = AuthActionTypes.LOGIN;

  constructor(public payload: any) {
  }
}

export class SignUp implements Action {
  readonly type = AuthActionTypes.SIGNUP;

  constructor(public payload: any) {
  }
}

export class LogOut implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

//  GETTING USER INFO ACTIONS ================================================================

export class UserInfo implements Action {
  readonly type = AuthActionTypes.USER_INFO;

  constructor(public payload = {}) {
  }
}

//  Actions state ============================================================================

export class Success implements Action {
  readonly type = AuthActionTypes.SUCCESS;

  constructor(public payload: any) {
  }
}

export class Failure implements Action {
  readonly type = AuthActionTypes.FAILURE;

  constructor(public payload: any) {
  }
}

//  EDITING USER INFO ACTIONS ================================================================

export class UserEditInfo implements Action {
  readonly type = AuthActionTypes.USER_EDIT_INFO;

  constructor(public payload: any) {
  }
}

export class UserEditPWD implements Action {
  readonly type = AuthActionTypes.USER_EDIT_PWD;

  constructor(public payload: any) {
  }
}

//  RESET STATE FIELDS =======================================================================

export class ResetMessages implements Action {
  readonly type = AuthActionTypes.RESET_MESSAGES;
  constructor(public payload: any) {
  }
}


export type AUTH_ACTIONS =
    | InitState
    | LogIn
    | SignUp
    | LogOut
    | UserInfo
    | Success
    | Failure
    | UserEditInfo
    | UserEditPWD
    | ResetMessages;


