// @flow

import type {Action} from "../types/redux";
import {httpGetAuth} from "../lib/api";
import {fromPairs} from 'lodash/array';

// Action types
export const GET_COURSES_OKAY = 'COURSES/GET-OKAY';
export const GET_COURSES_FAIL = 'COURSES/GET-FAIL';

// Action creators
export const getCourses = () => httpGetAuth('courses', [GET_COURSES_OKAY, GET_COURSES_FAIL]);

type Course = {
    _id: string,
    designation: string,
    title: string
};

export type State = { [string]: Course };
const initialState: State = {};

// Reducer
export default (state: State = initialState, action: Action) => {
    switch(action.type) {
        case GET_COURSES_OKAY:
            return fromPairs(action.payload.map(course => [course._id, course]));
        case GET_COURSES_FAIL:
            return initialState;
        default:
            return state;
    }
};
