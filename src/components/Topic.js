// @flow

import React from 'react';

import type {StringMapType} from "../types/basic";
import DangerDiv from './DangerDiv';
import {Uid} from './ShowObject';

import type {ListingType} from "../modules/code/Code";
import type {QuizType} from "../modules/quiz/components/Quiz";

import Listing from '../modules/code/Code';
import Quiz from '../modules/quiz/components/Quiz';

export type SectionType = ListingType | QuizType;

export type TopicType = {
    _id: string,
    title: string,
    intro: string,
    sections: Array<SectionType>
};

export const NullTopic: TopicType = {
    _id: 'zero',
    title: 'Null Topic',
    intro: 'This is the null topic',
    sections: []
};

// TODO: Temporary
function handleSubmission(values: StringMapType) {
    console.log("TOPIC SAYS", values);
}

const Topic = (props: { topic: TopicType}) => (
    <div>
        <Uid type="Topic" _id={props.topic._id}/>
        <h1 className="title is-1">{props.topic.title}</h1>
        <DangerDiv content={props.topic.intro}/>
        {props.topic.sections.map(section => {
            switch (section.type) {
                case 'listing':
                    return <Listing key={section._id}
                                    listing={section}/>;
                case 'quiz':
                    return <Quiz key={section._id}
                                 quiz={section}
                                 onSubmit={handleSubmission}/>;
                default:
                    return <p key={section._id}>{`Bogus section type: ${section.type}`}</p>;
            }
        })}
    </div>
);

export default Topic;
