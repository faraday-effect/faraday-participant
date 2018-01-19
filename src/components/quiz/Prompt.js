// @flow

import * as React from 'react';
import { Label } from 'semantic-ui-react';

type Props = {
    seq: number,
    prompt: string,
    required: boolean
};

const Prompt = (props: Props) => (
    <Label color="teal">
        {`${props.seq}. ${props.prompt}`}
        {props.required && <Label.Detail>Required</Label.Detail>}
    </Label>
);

export default Prompt;