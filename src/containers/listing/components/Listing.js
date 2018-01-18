// @flow

import React from 'react';
import Uid from '../../../components/Uid';

import CueCard from './CueCard';
import type {CueCardType} from './CueCard';

import Code from './Code';
import type {CodeType} from './Code';

import Note from './Note';
import type {NoteType} from './Note';

export type ListingType = {
    type: "listing",
    _id: string,
    uid: string,
    segments: Array<CodeType | CueCardType | NoteType>
};

export const Listing = (props: {listing: ListingType}) => (
    <div>
        <Uid uid={props.listing.uid}/>
        {props.listing.segments.map((segment, idx) => {
            let segmentKey = `segment-${idx}`;
            switch(segment.type) {
                case 'cue-card':
                    return <CueCard key={segmentKey} cuecard={segment}/>;
                case 'code':
                    return <Code key={segmentKey} code={segment}/>;
                case 'note':
                    return <Note key={segmentKey} note={segment}/>;
                default:
                    return <p>{`Bogus segement type: ${segment.type}`}</p>;
            }
        })}
    </div>
);

export default Listing;
