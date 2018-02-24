// @flow

import type {Action} from "../types/redux";
import {fromPairs} from "lodash/array";

// Action types
export const GET_OFFERINGS_REQUEST = 'OFFERINGS/GET-INIT';
export const GET_OFFERINGS_SUCCESS = 'OFFERINGS/GET-OKAY';
export const GET_OFFERINGS_FAILURE = 'OFFERINGS/GET-FAIL';

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
        case GET_OFFERINGS_SUCCESS:
            return fromPairs(action.payload.map(offering => [offering._id, offering]));
        case GET_OFFERINGS_FAILURE:
            return initialState;
        default:
            return state;
    }
};
