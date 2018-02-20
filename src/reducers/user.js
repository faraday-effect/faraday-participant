// @flow

import type {Action} from "../types/redux";

export const USER_LOGIN_REQUEST = 'USER/LOGIN-REQUEST';
export const USER_LOGIN_SUCCESS = 'USER/LOGIN-SUCCESS';
export const USER_LOGIN_FAILURE = 'USER/LOGIN-FAILURE';
export const USER_LOGOUT = 'USER/LOGOUT';



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
export const loginUser = (email: string, password: string) => ({
    type: USER_LOGIN_REQUEST,
    payload: {email, password}
});

// Reducer
const userReducer = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            return {
                ...action.payload.user,
                jwt: action.payload.jwt,
                isLoggedIn: true
            };
        case USER_LOGIN_FAILURE:
        case USER_LOGOUT:
            return initialState;
        default:
            return state;
    }
};

export default userReducer;
