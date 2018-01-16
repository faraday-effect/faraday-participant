// @flow

import React from 'react';

import type {TopicType} from '../actions/topic';
import { Segment } from 'semantic-ui-react';

const CueCard = (props: any) => (
    <Segment>
        <h1>{props.cuecard.title}</h1>
        {props.cuecard.content}
    </Segment>
);

const Code = (props: any) => (
    <Segment>
        {props.code.fileName}
        {props.code.content}
    </Segment>
);

const Note = (props: any) => (
    <Segment>
        {props.note.content}
    </Segment>
);

const Listing = (props: any) => (
    <Segment>
        <p>{props.listing.uid}</p>
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
    </Segment>
)

const Topic = (props: any) => (
    <Segment>
        <h1>{props.topic.title}</h1>
        {props.topic.intro}
        {props.topic.cells.map(cell => {
            switch(cell.type) {
                case 'listing':
                    return <Listing key={cell.uid} listing={cell}/>;
                default:
                    return <p>{`Bogus cell type: ${cell.type}`}</p>;
            }
        })}
    </Segment>
);

export default Topic;
