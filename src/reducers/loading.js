// @flow

import type {Action} from "../types/redux";

export const LOADING_STARTING = 'LOADING/STARTING';
export const LOADING_COMPLETE = 'LOADING/COMPLETE';

type State = boolean;
const initialState = false;

export const loadingStarting = () => ({type: LOADING_STARTING});
export const loadingComplete = () => ({type: LOADING_COMPLETE});

export default (state: State = initialState, action: Action) => {
    switch(action.type) {
        case LOADING_STARTING:
            return true;
        case LOADING_COMPLETE:
            return false;
        default:
            return state;
    }
};
