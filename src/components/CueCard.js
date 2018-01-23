// @flow

import React from 'react';
import DangerDiv from './DangerDiv';
import {Uid} from "./util";

export type CueCardType = {
    type: "cue-card",
    _id: "string",
    title: string,
    content: string
};

export const CueCard = (props: {cuecard: CueCardType}) => (
    <div>
        <Uid type="Cue Card" _id={props.cuecard._id}/>
        <h1 className="title is-1">{props.cuecard.title}</h1>
        <DangerDiv content={props.cuecard.content}/>
    </div>
);

export default CueCard;