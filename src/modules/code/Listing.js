// @flow

import React from 'react';

import DangerDiv from '../../components/DangerDiv';

export type CodeType = {
    type: "code",
    _id: string,
    meta: {
        language: string,
        fileName?: string
    },
    content: string
};

const TypedTag = (props: {type: string, tag: string}) => (
    <div className="tags has-addons">
        <span className="tag is-info">{props.type}</span>
        <span className="tag">{props.tag}</span>
    </div>
);

export const Code = (props: {code: CodeType}) => {
    return (
        <div className="container">
            <div className="level">
                <div className="level-left">
                    <div className="level-item">
                        {props.code.meta.fileName && <TypedTag type="File" tag={props.code.meta.fileName}/>}
                    </div>
                </div>
                <div className="level-right">
                    <TypedTag type="Lang" tag={props.code.meta.language}/>
                </div>
            </div>
            <DangerDiv content={props.code.content}/>
        </div>
    );
};

export default Code;
