// @flow

import type {Action} from "../types/redux";
import {fromPairs} from 'lodash/array';

// Action types
export const GET_COURSES_REQUEST = 'COURSES/GET-REQUEST';
export const GET_COURSES_SUCCESS = 'COURSES/GET-SUCCESS';
export const GET_COURSES_FAILURE = 'COURSES/GET-FAILURE';

// Action creators
export const getAllCourses = () => ({
    type: GET_COURSES_REQUEST,
    payload: 'all'
});

export const getCurrentCourses = () => ({
    type: GET_COURSES_REQUEST,
    payload: 'current'
});

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
        case GET_COURSES_SUCCESS:
            return fromPairs(action.payload.map(course => [course._id, course]));
        case GET_COURSES_FAILURE:
            return initialState;
        default:
            return state;
    }
};
