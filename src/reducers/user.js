// @flow

import {httpPost} from '../lib/api';
import type {Action} from "../types/redux";
import {flashInfo, flashError} from "./flash";
import {GRAND_CENTRAL, LOGIN_SCENE} from "./scenes";
import {redirect} from 'redux-first-router';
import JWT from 'jsonwebtoken';

const USER_AUTH_INIT = 'USER/AUTH-INIT';
const USER_AUTH_OKAY = 'USER/AUTH-OKAY';
const USER_AUTH_FAIL = 'USER/AUTH-FAIL';
const USER_LOG_OUT = 'USER/LOG-OUT';

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
    jwt?: string,
    isLoggedIn: boolean,
};

const initialState = {
    isLoggedIn: false
};

// Action creators
export function loginUser(email: string, password: string) {
    return async (dispatch: Function) => {
        dispatch({type: USER_AUTH_INIT});
        try {
            const response = await httpPost('authenticate', {email, password}, false);

            if (response.ok) {
                localStorage.setItem(JWT_LOCAL_STORAGE_KEY, response.payload.jwt);
                dispatch({
                    type: USER_AUTH_OKAY,
                    payload: {
                        user: response.payload.user,
                        jwt: response.payload.jwt
                    }
                });
                dispatch(flashInfo(`Welcome ${response.payload.user.firstName}`));
                dispatch(redirect({ type: GRAND_CENTRAL }));
            } else {
                localStorage.removeItem(JWT_LOCAL_STORAGE_KEY);
                dispatch({type: USER_AUTH_FAIL, payload: response.payload});
                dispatch(flashError(response.payload.message));
            }
        } catch (err) {
            dispatch(flashError(`Login failed (${err})`));
        }
    }
}

export function authenticateUser() {
    const localToken = localStorage.getItem(JWT_LOCAL_STORAGE_KEY);
    if (localToken) {
        const decoded = JWT.decode(localToken, {complete: true});
        return {
            type: USER_AUTH_OKAY,
            payload: {
                user: decoded.payload,
                jwt: localToken
            }
        };
    } else {
        console.log('No local JWT');
        return redirect({
            type: LOGIN_SCENE
        });
    }
}

const userReducer = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case USER_AUTH_OKAY:
            return {
                ...action.payload.user,
                jwt: action.payload.jwt,
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
