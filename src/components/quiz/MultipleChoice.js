// @flow

import * as React from 'react';
import { Form, Radio } from 'semantic-ui-react';
import Prompt from './Prompt';
import type {ChangeEventHandler} from '../../types/events';

type MultipleChoiceAnswerType = {
    value: string,
    text: string,
    correct: boolean
};

export type MultipleChoiceQuestionType = {
    type: 'multiple-choice',
    _id: string,
    required: boolean,
    prompt: string,
    options: Array<MultipleChoiceAnswerType>
};

type Props = {
    seq: number,
    question: MultipleChoiceQuestionType,
    response: string,
    onChange: ChangeEventHandler
};

const MultipleChoiceQuestion = (props: Props) => (
    <Form.Group grouped key={props.question._id}>
        <Prompt seq={props.seq}
                prompt={props.question.prompt}
                required={props.question.required}/>

        {props.question.options.map(option => (
            <Form.Field key={option.value}>
                <Radio
                    label={option.text}
                    name={props.question._id}
                    value={option.value}
                    checked={props.response === option.value}
                    onChange={props.onChange}/>
            </Form.Field>
        ))}
    </Form.Group>
);

export default MultipleChoiceQuestion;