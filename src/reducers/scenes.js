// @flow

import _ from 'lodash';

import type {Action} from '../types/redux';
import Courses from "../scenes/Courses";
import GrandCentral from "../scenes/GrandCentral";
import Login from "../scenes/Login";
import NotFound from "../scenes/NotFound";
import Projector from "../scenes/Projector";
import Signup from "../scenes/Signup";
import Logout from "../scenes/Logout";
import {NOT_FOUND} from "redux-first-router";

// Action types
export const COURSES_SCENE = 'SCENE/COURSES';
export const GRAND_CENTRAL = 'SCENE/GRAND-CENTRAL'
export const LOGIN_SCENE = 'SCENE/LOGIN';
export const LOGOUT_SCENE = 'SCENE/LOGOUT';
export const PROJECTOR_SCENE = 'SCENE/PROJECTOR';
export const SIGNUP_SCENE = 'SCENE/SIGNUP';

const actionMap = {
    [COURSES_SCENE]: {name: 'Courses', component: Courses},
    [GRAND_CENTRAL]: {name: 'GrandCentral', component: GrandCentral},
    [LOGIN_SCENE]: {name: 'Login', component: Login},
    [LOGOUT_SCENE]: {name: 'Logout', component: Logout},
    [NOT_FOUND]: {name: 'NotFound', component: NotFound},
    [PROJECTOR_SCENE]: {name: 'Projector', component: Projector},
    [SIGNUP_SCENE]: {name: 'Signup', component: Signup}
};

export const componentMap = _.fromPairs(_.map(actionMap, value => [ value.name, value.component ]));

// Reducer
type State = {
    name: string
};
const initialState = {
    name: actionMap[LOGIN_SCENE].name
};

export default (state: State = initialState, action: Action) => {
    const actionInfo = actionMap[action.type];
    if (actionInfo) {
        return {
            ...state,
            name: actionInfo.name
        };
    } else {
        return state;
    }
};
