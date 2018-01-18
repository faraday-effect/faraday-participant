// @flow

import React from 'react';
import DangerDiv from './DangerDiv';

import { Header } from 'semantic-ui-react';

export type CueCardType = {
    type: "cue-card",
    title: string,
    content: string
};

export const CueCard = (props: {cuecard: CueCardType}) => (
    <div>
        <Header as="h2">{props.cuecard.title}</Header>
        <DangerDiv content={props.cuecard.content}/>
    </div>
);

export default CueCard;