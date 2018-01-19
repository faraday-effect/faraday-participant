// @flow

import React from 'react';

import { Header } from 'semantic-ui-react';

import DangerDiv from './DangerDiv';
import Uid from './Uid';
import Listing from '../containers/Listing';
import type {ListingType} from "../containers/Listing";

export type TopicType = {
    _id: string,
    uid: string,
    title: string,
    intro: string,
    cells: Array<ListingType>
};

const Topic = (props: { topic: TopicType}) => (
    <div>
        <Header as="h1" textAlign="center">{props.topic.title}</Header>
        <Uid uid={props.topic.uid}/>
        <DangerDiv content={props.topic.intro}/>
        {props.topic.cells.map(cell => {
            switch (cell.type) {
                case 'listing':
                    return <Listing key={cell.uid} listing={cell}/>;
                default:
                    return <p key={cell.uid}>{`Bogus cell type: ${cell.type}`}</p>;
            }
        })}
    </div>
);

export default Topic;
