// @flow

import request from 'request-promise';
import {apiUrl} from './common';
import type {TopicType} from '../components/Topic';
import type {ActionType} from '../types/redux';

// Actions
const FETCH_ALL_INIT = 'TOPIC/FETCH_ALL_INIT';
const FETCH_ALL_OKAY = 'TOPIC/FETCH_ALL_OKAY';
const FETCH_ALL_FAIL = 'TOPIC/FETCH_ALL_FAIL';

const FETCH_ONE_OKAY = 'TOPIC/FETCH_ONE_OKAY';

// State
export type State = {
    byId: { [string]: TopicType },
    isFetchActive: boolean,
    error: string
};

const initialState: State = {
    byId: {},
    isFetchActive: false,
    error: ''
};

// Reducer
export default function reducer(state: State = initialState, action: ActionType) : State {
    switch (action.type) {
        case FETCH_ALL_INIT:
            return {
                ...state,
                isFetchActive: true,
                error: ''
            };
        case FETCH_ALL_OKAY:
            const allTopics = {};
            (action.payload: Array<TopicType>).forEach(topic => allTopics[topic._id] = topic);
            return {
                byId: allTopics,
                isFetchActive: false,
                error: ''
            };
        case FETCH_ALL_FAIL:
            return {
                ...state,
                isFetchActive: false,
                error: action.payload
            };
        case FETCH_ONE_OKAY:
            const topic: TopicType = action.payload;
            return {
                ...state,
                ...{ byId: {[topic._id]: topic}},
                isFetchActive: false,
                error: ''
            };
        default:
            return state;
    }
}

// Action creators
function fetchOneOkay(topic: TopicType) {
    return { type: FETCH_ONE_OKAY, payload: topic };
}

const fetchAllInit = () => ({
    type: FETCH_ALL_INIT
});

const fetchAllOkay = (topics: Array<TopicType>) => ({
    type: FETCH_ALL_OKAY,
    payload: topics
});

const fetchAllFail = (message: string) => ({
    type: FETCH_ALL_FAIL,
    payload: message
});

// Side effects
export function fetchOne(_id: string) {
    return (dispatch: $FlowTODO) => {
        request({
            url: apiUrl('topics', _id),
            json: true
        }).then(response => dispatch(fetchOneOkay(response)));
    };
}

export function fetchAll() {
    return (dispatch: $FlowTODO) => {
        dispatch(fetchAllInit());
        request({
            url: apiUrl('topics'),
            json: true
        })
            .then(response => dispatch(fetchAllOkay(response)))
            .catch((error: Error) => {
                console.error(error);
                dispatch(fetchAllFail('Unable to get topics from server'));
            });
    }
}
