// @flow

import * as React from 'react';
import Prompt from './Prompt';
import type {ChangeEventHandler} from '../../../types/events';

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
    <div className="field" key={props.question._id}>
        <Prompt seq={props.seq}
                prompt={props.question.prompt}
                required={props.question.required}/>
        <div className="control">
            {props.question.options.map(option => (
                <label className="radio" key={option.value}>
                    <input type="radio"
                           name={props.question._id}
                           value={option.value}
                           checked={props.response === option.value}
                           onChange={props.onChange}/>
                    {option.text}
                </label>
            ))}
        </div>
    </div>
);

export default MultipleChoiceQuestion;