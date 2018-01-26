// @flow

import React from 'react';

import type {StringMapType} from "../types/basic";
import DangerDiv from './DangerDiv';
import {Uid} from './util';

import Listing from './Listing';
import type {ListingType} from "./Listing";

import Quiz from '../components/quiz/Quiz';
import type {QuizType} from "../components/quiz/Quiz";

export type SectionType = ListingType | QuizType;

export type TopicType = {
    _id: string,
    title: string,
    intro: string,
    sections: Array<SectionType>
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
