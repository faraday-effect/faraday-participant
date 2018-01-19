// @flow

import request from 'request-promise';
import {apiUrl} from './common';
import type {TopicType} from '../components/Topic';

// Actions
const FETCH_ALL_OKAY = 'topic/FETCH_ALL_OKAY';
const FETCH_ONE_OKAY = 'topic/FETCH_ONE_OKAY';

// State
type State = { [string]: TopicType };
const initialState: State = {};

// Reducer
export default function reducer(state: State = initialState, action: any) {
    switch (action.type) {
        case FETCH_ALL_OKAY:
            const allTopics = {};
            (action.payload: Array<TopicType>)
                .forEach(topic => allTopics[topic._id] = topic);
            return allTopics;
        case FETCH_ONE_OKAY:
            const topic = (action.payload: TopicType);
            return {...state, [topic._id]: topic};
        default:
            return state;
    }
}

// Action creators
function fetchOneOkay(topic: TopicType) {
    return { type: FETCH_ONE_OKAY, payload: topic };
}

function fetchAllOkay(topics: Array<TopicType>) {
    return { type: FETCH_ALL_OKAY, payload: topics }
}

// Side effects
export function fetchOne(uid: string) {
    return (dispatch: $FlowTODO) => {
        request({
            url: apiUrl('topics', uid),
            json: true
        }).then(response => dispatch(fetchOneOkay(response)));
    };
}

export function fetchAll() {
    return (dispatch: $FlowTODO) => {
        request({
            url: apiUrl('topics'),
            json: true
        }).then(response => dispatch(fetchAllOkay(response)));
    }
}
