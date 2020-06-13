import {User} from '../../models/user.model';
import {AUTH_ACTIONS, AuthActionTypes} from '../actions/auth.actions';

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    SuccessMessage: string | null;
    FailureMessage: string | null;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    SuccessMessage: null,
    FailureMessage: null,
};

export function authReducer(state: AuthState, action: AUTH_ACTIONS) {
    console.log(action);
    switch (action.type) {
        case AuthActionTypes.INIT_STATE: {
            return action.payload;
        }

        case AuthActionTypes.LOGOUT: {
            return initialState;
        }

        case AuthActionTypes.SUCCESS: {
        const isAuthenticated = action.payload.authenticated ? action.payload.authenticated : state.isAuthenticated;
        const user = action.payload.userInfo ? action.payload.userInfo : state.user;
        return {
          user,
          isAuthenticated,
          SuccessMessage: action.payload.message,
          FailureMessage: null,
        };
      }

        case AuthActionTypes.FAILURE: {
            const isAuthenticated = action.payload.message.indexOf('auth') !== -1 ? false : state.isAuthenticated;
            return {
                ...state,
                isAuthenticated,
                SuccessMessage: null,
                FailureMessage: action.payload.message
            };
        }

        case AuthActionTypes.RESET_MESSAGES: {
            switch (action.payload) {
                case 'SuccessMessage' :
                    return {...state, SuccessMessage: null};
                case 'FailureMessage' :
                    return {...state, FailureMessage: null};
                default               :
                    return state;

            }
        }

        default: {
            return state;
        }
    }
}
