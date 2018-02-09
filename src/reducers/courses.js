// @flow

import type {Action} from "../types/redux";
import {httpGet} from "../lib/api";
import {flashError} from "./flash";

// Action types
export const GET_COURSES_INIT = 'COURSES/INIT';
export const GET_COURSES_OKAY = 'COURSES/OKAY';
export const GET_COURSES_FAIL = 'COURSES/FAIL';

// Action creators
export const getCourses = () => {
    return async (dispatch: Function) => {
        dispatch({type: GET_COURSES_INIT});

        try {
            const response = await httpGet('courses');
            if (response.ok) {
                dispatch({type: GET_COURSES_OKAY, payload: response.payload});
            } else {
                dispatch(flashError(`Unable to get courses (${response.payload.message})`));
                dispatch({type: GET_COURSES_FAIL});
            }
        } catch (err) {
            dispatch(flashError(`Unable to get courses from server (${err})`));
            dispatch({type: GET_COURSES_FAIL});
        }
    }
};

type Course = {
    _id: string,
    title: string
};

export type State = Array<Course>;
const initialState: State = [];

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


