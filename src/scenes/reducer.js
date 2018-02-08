// @flow

import _ from 'lodash';

import type {Action} from '../types/redux';
import Signup from "./Signup";
import Login from "./Login";
import Projector from "./Projector";
import {NOT_FOUND} from "redux-first-router";
import NotFound from "./NotFound";
import Home from "./Home";
import GrandCentral from "./GrandCentral";

// Action types
export const HOME_SCENE = 'SCENE/HOME';
export const GRAND_CENTRAL = 'SCENE/GRAND-CENTRAL'
export const SIGNUP_SCENE = 'SCENE/SIGNUP';
export const LOGIN_SCENE = 'SCENE/LOGIN';
export const PROJECTOR_SCENE = 'SCENE/PROJECTOR';
export const TOPICS_SCENE = 'SCENE/TOPICS';     // TODO: Get rid of this.

const actionMap = {
    [GRAND_CENTRAL]: {
        name: 'GrandCentral',
        component: GrandCentral
    },
    [HOME_SCENE]: {
        name: 'Home',
        component: Home
    },
    [SIGNUP_SCENE]: {
        name: 'Signup',
        component: Signup
    },
    [LOGIN_SCENE]: {
        name: 'Login',
        component: Login
    },
    [PROJECTOR_SCENE]: {
        name: 'Projector',
        component: Projector
    },
    [NOT_FOUND]: {
        name: 'NotFound',
        component: NotFound
    }
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
