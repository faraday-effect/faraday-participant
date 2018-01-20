// @flow

import React from 'react';

import DangerDiv from './DangerDiv';

export type CodeType = {
    type: "code",
    meta: {
        language: string,
        fileName?: string
    },
    content: string
};

export const Code = (props: {code: CodeType}) => (
    <div className="container">
        {props.code.meta.fileName && <span className="tag">{props.code.meta.fileName}</span>}
        <span className="tag">{props.code.meta.language}</span>
        <DangerDiv content={props.code.content}/>
    </div>
);

export default Code;
