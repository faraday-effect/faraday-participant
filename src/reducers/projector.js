// @flow

import type {SegmentType} from "../components/Segment";
import type {TopicType} from "../components/Topic";
import type {Action} from "../types/redux";
import {NullTopic} from "../components/Topic";
import type {ListingType} from "../components/Listing";

// Actions
export const FETCH_PROJECTOR_OKAY = 'PROJECTOR/FETCH-ALL-OKAY';
export const PROJECTOR_NEXT = 'PROJECTOR/NEXT';
export const PROJECTOR_PREV = 'PROJECTOR/PREV';

// State
export type State = {
    sections: Array<ListingType>,
    sectionIdx: number,
    segmentIdx: number,
    isFirstSegment: boolean,
    isLastSegment: boolean,
    currentSegment: ?SegmentType
};

const initialState: State = {
    sections: [],
    sectionIdx: 0,
    segmentIdx: 0,
    isFirstSegment: true,
    isLastSegment: false,
    currentSegment: null
};

// Index of last section of state.
function lastSectionIdx(state: State) {
    return state.sections.length - 1;
}

// Index of last segment of current section of state.
function lastSegmentIdx(state: State) {
    return state.sections[state.sectionIdx].segments.length - 1;
}

// State currently at the first segment?
function atFirstSegment(state: State) {
    return state.sectionIdx === 0
        && state.segmentIdx === 0;
}

// State currently at the last segment?
function atLastSegment(state: State) {
    return state.sectionIdx === lastSectionIdx(state)
        && state.segmentIdx === lastSegmentIdx(state);
}

// Set current segment based on indices.
function setCurrentSegment(state: State) {
    state.isFirstSegment = atFirstSegment(state);
    state.isLastSegment = atLastSegment(state);
    state.currentSegment = state.sections[state.sectionIdx].segments[state.segmentIdx];
}

// Advance to the next segment. If already at the last segment, do nothing.
function nextSegment(state: State) {
    state = {...state};
    if (!atLastSegment(state)) {
        if (state.segmentIdx === lastSegmentIdx(state)) {
            state.sectionIdx++;
            state.segmentIdx = 0;
        } else {
            state.segmentIdx++;
        }
        setCurrentSegment(state);
    }
    return state;
}

// Return to the previous segment. If already at the first segment, do nothing.
function previousSegment(state: State) {
    state = {...state};
    if (!atFirstSegment(state)) {
        if (state.segmentIdx === 0) {
            state.sectionIdx--;
            state.segmentIdx = lastSectionIdx(state);
        } else {
            state.segmentIdx--;
        }
        setCurrentSegment(state);
    }
    return state;
}

// Action creators
export const projectorNext = () => ({type: PROJECTOR_NEXT});
export const projectorPrev = () => ({type: PROJECTOR_PREV});

// Reducer
const projectorReducer = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case FETCH_PROJECTOR_OKAY:
            const newState: State = {
                ...initialState,
                sections: action.payload.sections
            };
            setCurrentSegment(newState);
            return newState;
        case PROJECTOR_NEXT:
            return nextSegment(state);
        case PROJECTOR_PREV:
            return previousSegment(state);
        default:
            return state;
    }
};

export default projectorReducer;
