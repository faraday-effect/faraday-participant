// @flow

import _ from 'lodash';

import {httpPost} from './api';
import type {Action} from "../types/redux";
import {FLASH_SET_MESSAGE, showFlash} from "./flash";

const USER_AUTH_INIT = 'USER/AUTH-INIT';
const USER_AUTH_OKAY = 'USER/AUTH-OKAY';
const USER_AUTH_FAIL = 'USER/AUTH-FAIL';
const USER_LOG_OUT = 'USER/LOG_OUT';

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

// Action creators
export function authenticateUser(email: string, password: string) {
    return async (dispatch: Function) => {
        dispatch({type: USER_AUTH_INIT});
        try {
            const response = await httpPost('authenticate', {email, password});

            if (response.ok) {
                dispatch({type: USER_AUTH_OKAY, payload: response.payload});
                dispatch(showFlash("info", `Welcome ${response.payload.firstName}`));
            } else {
                dispatch({type: USER_AUTH_FAIL, payload: response.payload});
            }
        } catch (err) {
            dispatch(showFlash('error', `Unable to get topics from server (${err})`));
        }
    }
};

const userReducer = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case USER_AUTH_OKAY:
            const nextState = _.pick(action.payload, ['email', 'firstName', 'lastName', 'permissions'])
            nextState.isLoggedIn = true;
            return nextState;
        case USER_AUTH_FAIL:
            return initialState;
        case USER_LOG_OUT:
            return initialState;
        case USER_AUTH_INIT:
        default:
            return state;
    }
};

export default userReducer;
