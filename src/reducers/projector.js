// @flow

import type {SegmentType} from "../components/Segment";
import type {Action} from "../types/redux";
import type {ListingType} from "../components/Listing";
import _ from 'lodash';
import type {SectionType, TopicType} from "../components/Topic";

// Actions
export const FETCH_PROJECTOR_OKAY = 'PROJECTOR/FETCH-ALL-OKAY';
export const PROJECTOR_NEXT = 'PROJECTOR/NEXT';
export const PROJECTOR_PREV = 'PROJECTOR/PREV';
export const PROJECTOR_FIRST = 'PROJECTOR/FIRST';
export const PROJECTOR_LAST = 'PROJECTOR/LAST';

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

// Index of last segment of given section. If no section provided,
// use the current section of the state.
function lastSegmentIdx(state: State, optSectionIdx : ?number) {
    const sectionIdx = optSectionIdx || state.sectionIdx;
    return state.sections[sectionIdx].segments.length - 1;
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
    return state;
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

function gotoState(state, sectionIdx, segmentIdx) {
    state = {...state};
    state.sectionIdx = sectionIdx;
    state.segmentIdx = segmentIdx;
    return setCurrentSegment(state);
}

// Action creators
export const projectorNext = () => ({type: PROJECTOR_NEXT});
export const projectorPrev = () => ({type: PROJECTOR_PREV});
export const projectorFirst = () => ({type: PROJECTOR_FIRST});
export const projectorLast = () => ({type: PROJECTOR_LAST});

// Reducer
const projectorReducer = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case FETCH_PROJECTOR_OKAY:
            const newState: State = {
                ...initialState,
                sections: _.filter(action.payload.sections, section => section.type === 'listing')
            };
            setCurrentSegment(newState);
            return newState;
        case PROJECTOR_NEXT:
            return nextSegment(state);
        case PROJECTOR_PREV:
            return previousSegment(state);
        case PROJECTOR_FIRST:
            return gotoState(state, 0, 0);
        case PROJECTOR_LAST:
            const lastSecIdx = lastSectionIdx(state);
            return gotoState(state, lastSecIdx, lastSegmentIdx(state, lastSecIdx));
        default:
            return state;
    }
};

export default projectorReducer;
