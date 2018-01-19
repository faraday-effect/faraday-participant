// @flow

import React from 'react';

import { Header } from 'semantic-ui-react';

import type {StringMapType} from "../types/basic";
import DangerDiv from './DangerDiv';
import Uid from './Uid';

import Listing from './Listing';
import type {ListingType} from "./Listing";

import Quiz from '../components/quiz/Quiz';
import type {QuizType} from "../components/quiz/Quiz";

export type TopicType = {
    _id: string,
    title: string,
    intro: string,
    cells: Array<ListingType | QuizType>
};

// TODO: Temporary
function handleSubmission(values: StringMapType) {
    console.log("TOPIC SAYS", values);
}

const Topic = (props: { topic: TopicType}) => (
    <div>
        <Header as="h1" textAlign="center">{props.topic.title}</Header>
        <Uid uid={props.topic._id}/>
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
