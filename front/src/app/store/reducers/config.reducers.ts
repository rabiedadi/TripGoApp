import {CONFIG_ACTIONS} from '../actions/config.actions';

export interface ConfigState {
    lang: string;
    currency: string;
}

const initialState: ConfigState = {
    lang: 'fr',
    currency: 'DZD',
};

export function configReducer(state: ConfigState, action: CONFIG_ACTIONS) {
    // switch (action.type) {}
}
