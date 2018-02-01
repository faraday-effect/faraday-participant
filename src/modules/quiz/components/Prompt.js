// @flow

import * as React from 'react';

type Props = {
    seq: number,
    prompt: string,
    required: boolean
};

const Prompt = (props: Props) => (
    <label className="label">
        {`${props.seq}. ${props.prompt}`}
        {props.required && <span className="tag">Required</span>}
    </label>
);

export default Prompt;