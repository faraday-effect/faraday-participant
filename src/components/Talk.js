// @flow
import * as React from 'react';
import { Segment } from 'semantic-ui-react';
import './zenburn.css';

type TalkSegmentType = {
    key: string,
    type: Array<string>,
    content: string;
};

export type TalkType = {
    title: string,
    topic: string,
    segments: Array<TalkSegmentType>;
};

type TalkProps = {
    talk: TalkType
};

export const Talk = (props: TalkProps) => {
    return (
        <Segment>
            <h1>{props.talk.title}</h1>
            <h2>{props.talk.topic}</h2>
            {props.talk.segments.map(segment =>
                <div key={segment.key} id={segment.key}>
                <h2>{segment.key}</h2>
                <div dangerouslySetInnerHTML={{__html: segment.content}} />
                </div>
            )}
        </Segment>
    );
};