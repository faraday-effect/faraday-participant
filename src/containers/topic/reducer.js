    // @flow

import request from 'request-promise';

import {apiUrl} from '../common';
import type {TopicType} from './components/Topic';

// State
type State = Array<TopicType>;
const initialState: State = [];

// Actions
const FETCH_TOPIC_SUCCEEDED = 'topic/FETCH_SUCCEEDED';

// Action creators
function fetchTopicSucceeded(topic: TopicType) {
    return {
        type: FETCH_TOPIC_SUCCEEDED,
        payload: topic
    };
}

// Reducer
export default function reducer(state: State = initialState, action: any) {
    switch (action.type) {
        case FETCH_TOPIC_SUCCEEDED:
            return [ action.payload ];
        default:
            return state;
    }
}

// Side effects
export function fetchTopic(uid: string) {
    return (dispatch: $FlowTODO) => {
        request({
            url: apiUrl('topics', uid),
            json: true
        }).then(response => dispatch(fetchTopicSucceeded(response)));
    };
}
