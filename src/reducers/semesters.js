// @flow

import type {Action} from "../types/redux";
import {fromPairs} from "lodash/array";

// Action types
export const GET_SEMESTERS_REQUEST = 'SEMESTERS/GET-INIT';
export const GET_SEMESTERS_SUCCESS = 'SEMESTERS/GET-OKAY';
export const GET_SEMESTERS_FAILURE = 'SEMESTERS/GET-FAIL';

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
        case GET_SEMESTERS_SUCCESS:
            return fromPairs(action.payload.map(semester => [semester._id, semester]));
        case GET_SEMESTERS_FAILURE:
            return initialState;
        default:
            return state;
    }
};
