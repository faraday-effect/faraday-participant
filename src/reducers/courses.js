// @flow

import type {Action} from "../types/redux";
import {httpGetAuth} from "../middleware/api";

// Action types
export const GET_COURSES_OKAY = 'COURSES/OKAY';
export const GET_COURSES_FAIL = 'COURSES/FAIL';

// Action creators
export const getCourses = () => httpGetAuth('courses', [GET_COURSES_OKAY, GET_COURSES_FAIL]);

type Course = {
    _id: string,
    designation: string,
    title: string
};

export type State = Array<Course>;
const initialState: State = [];

// Reducer
export default (state: State = initialState, action: Action) => {
    switch(action.type) {
        case GET_COURSES_OKAY:
            return action.payload;
        case GET_COURSES_FAIL:
            return initialState;
        default:
            return state;
    }
};
