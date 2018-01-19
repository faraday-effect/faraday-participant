// @flow

import * as React from 'react';
import { Form, Input } from 'semantic-ui-react';
import Prompt from './Prompt';
import type {ChangeEventHandler} from '../../types/events';

export type ShortAnswerQuestionType = {
    type: 'short-answer',
    _id: string,
    required: boolean,
    prompt: string
};

type Props = {
    seq: number,
    question: ShortAnswerQuestionType,
    response: string,
    onChange: ChangeEventHandler
};

const ShortAnswerQuestion = (props: Props) => (
    <Form.Field key={props.question._id}>
        <Prompt seq={props.seq}
                prompt={props.question.prompt}
                required={props.question.required}/>
        <Input
            name={props.question._id}
            value={props.response}
            onChange={props.onChange}/>
    </Form.Field>
);

export default ShortAnswerQuestion;
