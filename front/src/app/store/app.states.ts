import * as auth from './reducers/auth.reducers';

export interface AppState {
    readonly auth: auth.AuthState;
}

