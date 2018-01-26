// @flow

import request from 'request-promise';
import {apiUrl} from './common';
import type {TopicType, SectionType} from '../components/Topic';
import type {Action} from '../types/redux';
import type {SegmentType} from "../components/Segment";

// Actions
const FETCH_ALL_INIT = 'TOPICS/FETCH-ALL-INIT';
const FETCH_ALL_OKAY = 'TOPICS/FETCH-ALL-OKAY';
const FETCH_ALL_FAIL = 'TOPICS/FETCH-ALL-FAIL';

const SELECT_TOPIC = 'TOPIC/SELECT-TOPIC';
const SELECT_SECTION = 'TOPIC/SELECT-SECTION';
const SELECT_SEGMENT = 'TOPIC/SELECT-SEGMENT';

// State
export type State = {
    allTopics: Array<TopicType>,
    selectedSections: Array<SectionType>,
    selectedSegments: Array<SegmentType>,
    selectedSegment: any,
    isFetchActive: boolean,
    error: string
};

const initialState: State = {
    allTopics: [],
    selectedSections: [],
    selectedSegments: [],
    selectedSegment: null,
    isFetchActive: false,
    error: ''
};

// Reducer
export default function topicReducer(state: State = initialState, action: Action) : State {
    switch (action.type) {
        case FETCH_ALL_INIT:
            return {
                ...state,
                isFetchActive: true,
                error: ''
            };
        case FETCH_ALL_OKAY:
            return {
                allTopics: action.payload,
                selectedSections: [],
                selectedSegments: [],
                selectedSegment: null,
                isFetchActive: false,
                error: ''
            };
        case FETCH_ALL_FAIL:
            return {
                ...state,
                isFetchActive: false,
                error: action.payload
            };

        case SELECT_TOPIC:
            return {
                ...state,
                selectedSections: action.payload.sections,
                selectedSegments: [],
                selectedSegment: null
            };
        case SELECT_SECTION:
            return {
                ...state,
                selectedSegments: action.payload.segments,
                selectedSegment: null
            };
        case SELECT_SEGMENT:
            return {
                ...state,
                selectedSegment: action.payload
            };
        default:
            return state;
    }
}

// Action creators
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

export const selectTopic = (topic: string) => ({
    type: SELECT_TOPIC,
    payload: topic
});

export const selectSection = (section: string) => ({
    type: SELECT_SECTION,
    payload: section
});

export const selectSegment = (segment: string) => ({
    type: SELECT_SEGMENT,
    payload: segment
});

// Side effects
export function fetchAll() {
    return (dispatch: $FlowTODO) => {
        dispatch(fetchAllInit());
        request({
            url: apiUrl('topics'),
            json: true
        }).then((topics: Array<TopicType>) => {
            dispatch(fetchAllOkay(topics));
        }).catch((error: Error) => {
            console.error(error);
            dispatch(fetchAllFail('Unable to get topics from server'));
        });
    }
}
