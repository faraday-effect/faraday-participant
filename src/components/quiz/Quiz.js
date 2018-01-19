// @flow

import * as React from 'react';
import { Button, Form, Header, Segment } from 'semantic-ui-react';
import _ from 'lodash';

import * as questionTypes from './constants';

import MultipleChoiceQuestion from './MultipleChoice';
import type {MultipleChoiceQuestionType} from "./MultipleChoice";

import ShortAnswerQuestion from './ShortAnswer';
import type {ShortAnswerQuestionType} from "./ShortAnswer";
import type {SemanticUIData} from "../../types/events";

export type QuizType = {
    _id: string,
    title: string,
    required: boolean,
    questions: Array<ShortAnswerQuestionType | MultipleChoiceQuestionType>
};

type Props = {
    quiz: QuizType,
    onSubmit: ({[string]: string}) => void;
};

class Quiz extends React.Component<Props, {[string]: string}> {
    constructor(props: Props) {
        super(props);
        this.state = {}
    }

    handleAnswerChange = (event: SyntheticEvent<>, data: SemanticUIData) => {
        console.log(this, data.name, data.value);
        this.setState({[data.name]: data.value});
    };

    handleSubmit = () => {
        console.log("SUBMIT", this.state);
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
                        question={(question: MultipleChoiceQuestionType)}
                        response={this.state[question.uid]}
                        onChange={this.handleAnswerChange}
                    />
                );
            case questionTypes.SHORT_ANSWER:
                return (
                    <ShortAnswerQuestion
                        key={`question-${seq}`}
                        seq={seq}
                        question={(question: ShortAnswerQuestionType)}
                        response={this.state[question.uid]}
                        onChange={this.handleAnswerChange}
                    />
                );
            default:
                return <p>INVALID QUESTION TYPE</p>;
        }
    };

    render() {
        return (
            <Segment>
                <div className="quiz">
                    <Header as="h1">{this.props.quiz.title}</Header>
                    <Form>
                        {this.props.quiz.questions.map((question, idx) =>
                            this.renderQuestion(question, idx + 1))}
                        <Button
                            disabled={!this.haveRequiredAnswers()}
                            primary
                            onClick={this.handleSubmit}>Submit</Button>
                    </Form>
                </div>
            </Segment>
        );
    }
}

export default Quiz;
