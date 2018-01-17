// @flow

import React from 'react';

import { Header, Label, Segment } from 'semantic-ui-react';

import type {CueCardType, ListingType, CodeType, NoteType, TopicType} from '../actions/topic';

import Quiz from './Quiz';

const Uid = (props: { uid: string }) => (
//    <Label tag color="teal">{props.uid}</Label>
    <div/>
);

const DangerDiv = (props: { content: string}) => (
    <div dangerouslySetInnerHTML={{__html: props.content}}/>
);

const CueCard = (props: {cuecard: CueCardType}) => (
    <div>
        <Header as="h2">{props.cuecard.title}</Header>
        <DangerDiv content={props.cuecard.content}/>
    </div>
);

const Code = (props: {code: CodeType}) => (
    <Segment>
        {props.code.meta.fileName && <Label ribbon color="teal">{props.code.meta.fileName}</Label>}
        <Label attached="top right">{props.code.meta.language}</Label>
        <DangerDiv content={props.code.content}/>
    </Segment>
);

const Note = (props: {note: NoteType}) => (
    <div>
        <DangerDiv content={props.note.content}/>
    </div>
);

const Listing = (props: {listing: ListingType}) => (
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

const Topic = (props: {topic: TopicType}) => (
    <div>
        <Header as="h1" textAlign="center">{props.topic.title}</Header>
        <Uid uid={props.topic.uid}/>
        <DangerDiv content={props.topic.intro}/>
        {props.topic.cells.map(cell => {
            switch(cell.type) {
                case 'listing':
                    return <Listing key={cell.uid} listing={cell}/>;
                case 'quiz':
                    return <Quiz key={cell.uid} quiz={cell}/>;
                default:
                    return <p>{`Bogus cell type: ${cell.type}`}</p>;
            }
        })}
    </div>
);

export default Topic;
