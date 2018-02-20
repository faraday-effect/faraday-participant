// @flow

import type {Action} from "../types/redux";
import {httpGetAuth} from "../lib/api";
import {fromPairs} from "lodash/array";

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
    name: string,
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
            return fromPairs(action.payload.map(semester => [semester._id, semester]));
        case GET_SEMESTERS_FAIL:
            return initialState;
        default:
            return state;
    }
};
