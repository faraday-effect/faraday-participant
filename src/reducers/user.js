// @flow

import {httpPost} from './api';
import type {Action} from "../types/redux";
import {flashInfo, flashError} from "./flash";
import {GRAND_CENTRAL} from "../scenes/reducer";
import {redirect} from 'redux-first-router';

const USER_AUTH_INIT = 'USER/AUTH-INIT';
const USER_AUTH_OKAY = 'USER/AUTH-OKAY';
const USER_AUTH_FAIL = 'USER/AUTH-FAIL';
const USER_LOG_OUT = 'USER/LOG_OUT';

const JWT_LOCAL_STORAGE_KEY = 'faraday-jwt';

type Permission = {
    _id: string,
    description: string
};

type User = {
    _id: string,
    firstName: string,
    lastName: string,
    roleId: string,
    permissions: Array<Permission>,
    email: string,
    mobilePhone: string,
    officePhone: string,
    officeLocation: string
};

type State = {
    user?: User,
    isLoggedIn: boolean
};

const initialState = {
    isLoggedIn: false
};

// Action creators
export function authenticateUser(email: string, password: string) {
    return async (dispatch: Function) => {
        dispatch({type: USER_AUTH_INIT});
        try {
            const response = await httpPost('authenticate', {email, password});

            if (response.ok) {
                localStorage.setItem(JWT_LOCAL_STORAGE_KEY, response.payload.jwt);
                dispatch({type: USER_AUTH_OKAY, payload: response.payload.user});
                dispatch(flashInfo(`Welcome ${response.payload.user.firstName}`));
                dispatch(redirect({ type: GRAND_CENTRAL }));
            } else {
                localStorage.removeItem(JWT_LOCAL_STORAGE_KEY);
                dispatch({type: USER_AUTH_FAIL, payload: response.payload});
                dispatch(flashError(response.payload.message));
            }
        } catch (err) {
            dispatch(flashError(`Unable to get topics from server (${err})`));
        }
    }
};

const userReducer = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case USER_AUTH_OKAY:
            return {
                ...action.payload,
                isLoggedIn: true
            };
        case USER_AUTH_FAIL:
        case USER_LOG_OUT:
            return initialState;
        case USER_AUTH_INIT:
        default:
            return state;
    }
};

export default userReducer;
