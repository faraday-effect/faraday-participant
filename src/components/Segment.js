// @flow

import React from 'react';

import CueCard from './CueCard';
import type {CueCardType} from './CueCard';

import Code from './Code';
import type {CodeType} from './Code';

import Note from './Note';
import type {NoteType} from './Note';

export type SegmentType = CodeType | CueCardType | NoteType;

export const segmentFactory = (segmentData: SegmentType) => {
    if (!segmentData) {
        return <p>BOGUS SEGMENT</p>
    }
    switch (segmentData.type) {
        case 'cue-card':
            return <CueCard cuecard={segmentData}/>;
        case 'code':
            return <Code code={segmentData}/>;
        case 'note':
            return <Note note={segmentData}/>;
        default:
            throw new Error(`Invalid segment type ${segmentData.type}`);
    }
};
