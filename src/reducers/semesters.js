// @flow

import type {Action} from "../types/redux";
import {httpGetAuth} from "../middleware/api";

// Action types
export const GET_SEMESTERS_OKAY = 'SEMESTERS/OKAY';
export const GET_SEMESTERS_FAIL = 'SEMESTERS/FAIL';

// Action creators
export const getSemesters = () => httpGetAuth('semesters', [GET_SEMESTERS_OKAY, GET_SEMESTERS_FAIL]);

type DateRangeMap = {
    [string]: {
        start: string,
        end: string
    }
};

type Semester = {
    _id: string,
    semester: string,
    year: number,
    courseDates: DateRangeMap,
    holidays: DateRangeMap
};

export type State = Array<Semester>;
const initialState: State = [];

// Reducer
export default (state: State = initialState, action: Action) => {
    switch(action.type) {
        case GET_SEMESTERS_OKAY:
            return action.payload;
        case GET_SEMESTERS_FAIL:
            return initialState;
        default:
            return state;
    }
};
