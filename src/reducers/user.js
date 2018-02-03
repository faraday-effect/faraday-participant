// @flow

import type {Action} from "../types/redux";

export const USER_AUTHENTICATE = 'USER/AUTHENTICATE';
export const USER_LOG_IN = 'USER/LOG_IN';
export const USER_LOG_OUT = 'USER/LOG_OUT';

type Permission = {
    _id: string,
    description: string
};

type State = {
    email: string,
    firstName: string,
    lastName: string,
    permissions: Array<Permission>,
    isLoggedIn: boolean
};

const initialState = {
    email: '',
    firstName: '',
    lastName: '',
    permissions: [],
    isLoggedIn: false
};

const userReducer = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case USER_AUTHENTICATE:
        case USER_LOG_IN:
        case USER_LOG_OUT:
        default:
            return state;
    }
};

export default userReducer;
