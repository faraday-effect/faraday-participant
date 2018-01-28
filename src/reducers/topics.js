// @flow

import request from 'request-promise';
import {apiUrl} from './common';
import type {TopicType, SectionType} from '../components/Topic';
import type {Action} from '../types/redux';
import type {SegmentType} from "../components/Segment";
import {TOPICS_PAGE} from './page';

// Actions
const FETCH_ALL_INIT = 'TOPICS/FETCH-ALL-INIT';
const FETCH_ALL_OKAY = 'TOPICS/FETCH-ALL-OKAY';
const FETCH_ALL_FAIL = 'TOPICS/FETCH-ALL-FAIL';

// State
export type State = {
    allTopics: Array<TopicType>,
    currentTopic: any,

    selectedSections: Array<SectionType>,
    currentSection: any,

    selectedSegments: Array<SegmentType>,
    currentSegment: any,

    isFetchActive: boolean,
    error: string
};

const initialState: State = {
    allTopics: [],
    currentTopic: null,
    selectedSections: [],
    currentSection: null,
    selectedSegments: [],
    currentSegment: null,
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
                currentTopic: null,
                selectedSections: [],
                currentSection: null,
                selectedSegments: [],
                currentSegment: null,
                isFetchActive: false,
                error: ''
            };
        case FETCH_ALL_FAIL:
            return {
                ...state,
                isFetchActive: false,
                error: action.payload
            };

        case TOPICS_PAGE:
            if (!state.allTopics.length) {
                return state;
            }

            const nextState = {
                ...state,
            };

            if (action.payload.topicId) {
                const topic = state.allTopics.find(topic => topic._id === action.payload.topicId);
                nextState.currentTopic = topic;
                nextState.selectedSections = topic.sections;
                nextState.selectedSegments = [];
                nextState.currentSegment = null;
            }

            if (action.payload.sectionId) {
                const section = state.selectedSections.find(section => section._id === action.payload.sectionId);
                nextState.currentSection = section;
                nextState.selectedSegments = section.segments;
                nextState.currentSegment = null;
            }

            if (action.payload.segmentId) {
                nextState.currentSegment =
                    state.selectedSegments.find(segment => segment._id === action.payload.segmentId);
            }

            return nextState;

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