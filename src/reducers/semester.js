// @flow

import type {Action} from "../types/redux";

// Action types
export const GET_SEMESTER_REQUEST = 'SEMESTER/GET-INIT';
export const GET_SEMESTER_SUCCESS = 'SEMESTER/GET-OKAY';
export const GET_SEMESTER_FAILURE = 'SEMESTER/GET-FAIL';

type DateRangeMap = {
    [string]: {
        start: string,
        end: string
    }
};

type Semester = {
    _id: string,
    name: string,
    year: number,
    courseDates: DateRangeMap,
    holidays: DateRangeMap
};

export type State = Semester;
const initialState: State | Object = {};

// Reducer
export default (state: State = initialState, action: Action) => {
    switch(action.type) {
        case GET_SEMESTER_SUCCESS:
            return action.payload;
        case GET_SEMESTER_FAILURE:
            return initialState;
        default:
            return state;
    }
};
