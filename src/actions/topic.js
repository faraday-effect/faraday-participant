// @flow

import request from 'request-promise';
import apiUrl from './common';

export const topicActionType = {
    FETCH_TOPIC_SUCCEEDED: 'FETCH_TOPIC_SUCCEEDED',
};

export type CodeType = {
    type: "code",
    meta: {
        language: string,
        fileName?: string
    },
    content: string
};

export type CueCardType = {
    type: "cue-card",
    title: string,
    content: string
};

export type NoteType = {
    type: "note",
    content: string,
};

export type ListingType = {
    type: "listing",
    _id: string,
    uid: string,
    segments: Array<CodeType | CueCardType | NoteType>
};

export type TopicType = {
    _id: string,
    uid: string,
    title: string,
    intro: string,
    cells: Array<ListingType>
};

function fetchTopicSucceeded(topic: TopicType) {
    return {
        type: topicActionType.FETCH_TOPIC_SUCCEEDED,
        payload: topic
    };
}

export function fetchTopic(uid: string) {
    return (dispatch: $FlowTODO) => {
        request({
            url: apiUrl('topics', uid),
            json: true
        }).then(response => dispatch(fetchTopicSucceeded(response)));
    };
}
