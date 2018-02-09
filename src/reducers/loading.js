// @flow

import type {Action} from "../types/redux";

import {FETCH_TOPIC_OKAY} from "./topics";
import {GET_COURSES_FAIL, GET_COURSES_INIT, GET_COURSES_OKAY} from "./courses";

type State = boolean;
const initialState = false;

export default (state: State = initialState, action: Action) => {
    switch(action.type) {
        case GET_COURSES_INIT:
            return true;
        case FETCH_TOPIC_OKAY:
        case GET_COURSES_OKAY:
        case GET_COURSES_FAIL:
            return false;
        default:
            return state;
    }
};
