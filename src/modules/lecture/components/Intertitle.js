// @flow

import React from 'react';
import DangerDiv from '../../../components/DangerDiv';

export type CueCardType = {
    type: "cue-card",
    _id: "string",
    title: string,
    content: string
};

export const Intertitle = (props: {cuecard: CueCardType}) => (
    <div>
        <h1 className="title">{props.cuecard.title}</h1>
        <h2 className="subtitle">
            <DangerDiv content={props.cuecard.content}/>
        </h2>
    </div>
);

export default Intertitle;