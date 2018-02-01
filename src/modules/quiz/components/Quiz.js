// @flow

import * as React from 'react';
import _ from 'lodash';

import * as questionTypes from '../constants';

import MultipleChoiceQuestion from './MultipleChoice';
import type {MultipleChoiceQuestionType} from "./MultipleChoice";

import ShortAnswerQuestion from './ShortAnswer';
import type {ShortAnswerQuestionType} from "./ShortAnswer";
import type {StringMapType} from "../../../types/basic";

export type QuizType = {
    type: "quiz",
    _id: string,
    title: string,
    questions: Array<ShortAnswerQuestionType | MultipleChoiceQuestionType>
};

type Props = {
    quiz: QuizType,
    onSubmit: (StringMapType) => void;
};

class Quiz extends React.Component<Props, StringMapType> {
    constructor(props: Props) {
        super(props);
        this.state = _.fromPairs(props.quiz.questions.map(question => [question._id, '']));
    }

    handleAnswerChange = (event: any) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    handleSubmit = (event: any) => {
        this.props.onSubmit(this.state);
    };

    haveRequiredAnswers() {
        return _.every(_.filter(this.props.quiz.questions, question => question.required),
            question => this.state[question._id]);
    }

    renderQuestion(question: any, seq: number) {
        switch (question.type) {
            case questionTypes.MULTIPLE_CHOICE:
                return (
                    <MultipleChoiceQuestion
                        key={`question-${seq}`}
                        seq={seq}
                        question={question}
                        response={this.state[question._id]}
                        onChange={this.handleAnswerChange}
                    />
                );
            case questionTypes.SHORT_ANSWER:
                return (
                    <ShortAnswerQuestion
                        key={`question-${seq}`}
                        seq={seq}
                        question={question}
                        response={this.state[question._id]}
                        onChange={this.handleAnswerChange}
                    />
                );
            default:
                return <p>INVALID QUESTION TYPE</p>;
        }
    };

    render() {
        return (
            <div className="box">
                <div className="quiz">
                    <h1 className="title is-1">{this.props.quiz.title}</h1>
                    <form>
                        {this.props.quiz.questions.map((question, idx) =>
                            this.renderQuestion(question, idx + 1))}
                        <div className="field">
                            <div className="control">
                                <button type="button"
                                        className="button is-link"
                                        disabled={!this.haveRequiredAnswers()}
                                        onClick={this.handleSubmit}>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Quiz;
