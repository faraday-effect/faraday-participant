// @flow

import type {Action} from "../types/redux";
import {httpGetAuth} from "../middleware/api";
import {fromPairs} from "lodash/array";

// Action types
export const GET_OFFERINGS_OKAY = 'OFFERINGS/OKAY';
export const GET_OFFERINGS_FAIL = 'OFFERINGS/FAIL';

// Action creators
export const getOfferings = () => httpGetAuth('offerings', [GET_OFFERINGS_OKAY, GET_OFFERINGS_FAIL]);

type Meeting = {
    day: string,
    startTime: string,
    endTime: string,
    room: string
};

type Section = {
    _id: string,
    teacherId: string,
    meetings: Array<Meeting>
};

type Offering = {
    _id: string,
    courseId: string,
    semesterId: string,
    sections: Array<Section>,
    topicIds: Array<string>
};

export type State = Array<Offering>;
const initialState: State = [];

// Reducer
export default (state: State = initialState, action: Action) => {
    switch(action.type) {
        case GET_OFFERINGS_OKAY:
            return fromPairs(action.payload.map(offering => [offering._id, offering]));
        case GET_OFFERINGS_FAIL:
            return initialState;
        default:
            return state;
    }
};
