// @flow

import React from 'react';
import DangerDiv from './DangerDiv';

export type CueCardType = {
    type: "cue-card",
    title: string,
    content: string
};

export const CueCard = (props: {cuecard: CueCardType}) => (
    <div>
        <h1 className="title is-1">{props.cuecard.title}</h1>
        <DangerDiv content={props.cuecard.content}/>
    </div>
);

export default CueCard;