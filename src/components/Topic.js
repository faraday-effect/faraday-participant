// @flow

import React from 'react';

import type {StringMapType} from "../types/basic";
import DangerDiv from './DangerDiv';
import Uid from './util';

import Listing from './Listing';
import type {ListingType} from "./Listing";

import Quiz from '../components/quiz/Quiz';
import type {QuizType} from "../components/quiz/Quiz";

export type CellType = ListingType | QuizType;

export type TopicType = {
    _id: string,
    title: string,
    intro: string,
    cells: Array<CellType>
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
        {props.topic.cells.map(cell => {
            switch (cell.type) {
                case 'listing':
                    return <Listing key={cell._id}
                                    listing={cell}
                    />;
                case 'quiz':
                    return <Quiz key={cell._id}
                                 quiz={cell}
                                 onSubmit={handleSubmission}
                    />;
                default:
                    return <p key={cell._id}>{`Bogus cell type: ${cell.type}`}</p>;
            }
        })}
    </div>
);

export default Topic;
