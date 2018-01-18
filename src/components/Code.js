// @flow

import React from 'react';

import { Label, Segment } from 'semantic-ui-react';

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
    <Segment>
        {props.code.meta.fileName && <Label ribbon color="teal">{props.code.meta.fileName}</Label>}
        <Label attached="top right">{props.code.meta.language}</Label>
        <DangerDiv content={props.code.content}/>
    </Segment>
);

export default Code;
