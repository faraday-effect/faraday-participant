// @flow

import type {TopicType, SectionType} from '../components/Topic';
import type {SegmentType} from "../components/Segment";
import type {Action} from '../types/redux';

// Actions
export const FETCH_ALL_INIT = 'TOPICS/FETCH-ALL-INIT';
export const FETCH_ALL_OKAY = 'TOPICS/FETCH-ALL-OKAY';
export const FETCH_ALL_FAIL = 'TOPICS/FETCH-ALL-FAIL';

// State
export type State = {
    allTopics: $ReadOnlyArray<TopicType>,
    currentTopic: TopicType | null,

    selectedSections: $ReadOnlyArray<SectionType>,
    currentSection: SectionType | null,

    selectedSegments: $ReadOnlyArray<SegmentType>,
    currentSegment: SegmentType | null,
    error: string
};

const initialState: State = {
    allTopics: [],
    currentTopic: null,
    selectedSections: [],
    currentSection: null,
    selectedSegments: [],
    currentSegment: null,
    error: ''
};

// Reducer
export default function topicReducer(state: State = initialState, action: Action) : State {
    switch (action.type) {
        case FETCH_ALL_OKAY:
            const nextState = {
                allTopics: action.payload.topics,
                currentTopic: null,
                selectedSections: [],
                currentSection: null,
                selectedSegments: [],
                currentSegment: null,
                error: ''
            };

            if (action.payload.topicId) {
                const topic = nextState.allTopics.find(topic => topic._id === action.payload.topicId);
                nextState.currentTopic = topic;
                nextState.selectedSections = topic.sections;
                nextState.selectedSegments = [];
                nextState.currentSegment = null;
            }

            if (action.payload.sectionId) {
                const section = nextState.selectedSections.find(section => section._id === action.payload.sectionId);
                if (section != null) {
                    nextState.currentSection = section;
                    nextState.selectedSegments = section.segments;
                    nextState.currentSegment = null;
                }
            }

            if (action.payload.segmentId) {
                const val = nextState.selectedSegments.find(segment => segment._id === action.payload.segmentId);
                if (val != null) {
                    nextState.currentSegment = val;
                }
            }

            return nextState;

        case FETCH_ALL_FAIL:
            return {
                ...state,
                error: action.payload
            };

        default:
            return state;
    }
}
