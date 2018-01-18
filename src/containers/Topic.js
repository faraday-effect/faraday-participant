// @flow

import React from 'react';

import { Header } from 'semantic-ui-react';

import DangerDiv from '../components/DangerDiv';
import Uid from '../components/Uid';
import Listing from './Listing';

import type {ListingType} from "./Listing";

export type TopicType = {
    _id: string,
    uid: string,
    title: string,
    intro: string,
    cells: Array<ListingType>
};

// import Quiz from './Quiz';

export const Topic = (props: {topic: TopicType}) => (
    <div>
        <Header as="h1" textAlign="center">{props.topic.title}</Header>
        <Uid uid={props.topic.uid}/>
        <DangerDiv content={props.topic.intro}/>
        {props.topic.cells.map(cell => {
            switch (cell.type) {
                case 'listing':
                    return <Listing key={cell.uid} listing={cell}/>;
                // case 'quiz':
                //     return <Quiz key={cell.uid} quiz={cell}/>;
                default:
                    return <p>{`Bogus cell type: ${cell.type}`}</p>;
            }
        })}
    </div>
);

export default Topic;
