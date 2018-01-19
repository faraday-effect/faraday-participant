// @flow

import React from 'react';

import { Header } from 'semantic-ui-react';

import DangerDiv from './DangerDiv';
import Uid from './Uid';
import Listing from '../containers/Listing';
import type {ListingType} from "../containers/Listing";

export type TopicType = {
    _id: string,
    title: string,
    intro: string,
    cells: Array<ListingType>
};

const Topic = (props: { topic: TopicType}) => (
    <div>
        <Header as="h1" textAlign="center">{props.topic.title}</Header>
        <Uid uid={props.topic._id}/>
        <DangerDiv content={props.topic.intro}/>
        {props.topic.cells.map(cell => {
            switch (cell.type) {
                case 'listing':
                    return <Listing key={cell._id} listing={cell}/>;
                default:
                    return <p key={cell._id}>{`Bogus cell type: ${cell.type}`}</p>;
            }
        })}
    </div>
);

export default Topic;
