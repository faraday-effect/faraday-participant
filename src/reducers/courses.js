// @flow

import type {Action} from "../types/redux";
import {httpGet} from "../lib/api";
import {flashError} from "./flash";

// Action types
export const GET_COURSES_INIT = 'COURSES/INIT';
export const GET_COURSES_OKAY = 'COURSES/OKAY';
export const GET_COURSES_FAIL = 'COURSES/FAIL';

// Action creators
export const getCourses = async (dispatch: Function, getState: any) => {
    dispatch({ type: GET_COURSES_INIT });

    try {
        const topic = await httpGet(['courses']);
        dispatch({type: GET_COURSES_OKAY, payload: topic.payload});
    } catch (err) {
        flashError(`Unable to get topics from server (${err})`);
        dispatch({type: GET_COURSES_FAIL});
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


