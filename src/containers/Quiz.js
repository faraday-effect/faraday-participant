// @flow

import * as React from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { Button, Form, Header, Input, Label, Radio, Segment } from 'semantic-ui-react';
import { every, filter, fromPairs } from 'lodash';

import { answerQuestion } from ".

export const quizConstants = {
    SHORT_ANSWER: 'short-answer',
    MULTIPLE_CHOICE: 'multiple-choice'
};

type ShortAnswerQuestionType = {
    key: string,
    type: string,
    required: boolean,
    prompt: string,
};

type MultipleChoiceAnswerType = {
    value: string,
    text: string,
    correct: boolean
};

type MultipleChoiceQuestionType = {
    key: string,
    type: string,
    prompt: string,
    options: Array<MultipleChoiceAnswerType>
};

type AnyQuestionType = ShortAnswerQuestionType | MultipleChoiceQuestionType;

type SemanticUIData = {
    name: string,
    value: string
};

type OnChangeEventType = (SyntheticEvent<>, SemanticUIData) => void;

type QuestionPromptProps = {
    question: AnyQuestionType,
    qNo: number
}

const QuestionPrompt = (props: QuestionPromptProps) => {
    return (
        <Label color="teal">
            {props.qNo + ". " + props.question.prompt}
            {props.question.required && <Label.Detail>Required</Label.Detail>}
        </Label>
    );
};

type ShortAnswerQuestionProps = {
    question: ShortAnswerQuestionType,
    qNo: number,
    content: string,
    onChange: OnChangeEventType
};

const ShortAnswerQuestion = (props: ShortAnswerQuestionProps) => (
    <Form.Field key={props.question.key}>
        <QuestionPrompt question={props.question} qNo={props.qNo}/>
        <Input
            name={props.question.key}
            value={props.content}
            onChange={props.onChange}/>
    </Form.Field>
);

type MultipleChoiceQuestionProps = {
    question: MultipleChoiceQuestionType,
    qNo: number,
    content: string,
    onChange: OnChangeEventType
};

const MultipleChoiceQuestion = (props: MultipleChoiceQuestionProps) => (
    <Form.Group grouped key={props.question.key}>
        <QuestionPrompt question={props.question} qNo={props.qNo}/>
        {props.question.options.map(option => (
            <Form.Field key={option.value}>
                <Radio
                    label={option.text}
                    name={props.question.key}
                    value={option.value}
                    checked={props.content === option.value}
                    onChange={props.onChange}/>
            </Form.Field>
        ))}
    </Form.Group>
);

type QuizType = {
    key: string,
    title: string,
    required: boolean,
    questions: Array<AnyQuestionType>,
    response: { string: string }
};

type QuizProps = {
    answerQuestion: (string, string, string) => void,
    quiz: QuizType
};

class Quiz extends React.Component<QuizProps> {
    constructor(props: QuizProps) {
        super(props);
        props.quiz.response = fromPairs(props.quiz.questions.map(question => [question.key, '']));
    }

    handleAnswerChange = (event, data) => {
        console.log(this, data.name, data.value);
        this.props.answerQuestion(this.props.quiz.key, data.name, data.value);
    };

    handleSubmit = (event, data) => {
        console.log("SUBMIT", this.props.quiz.response);
    };

    haveRequiredAnswers() {
        return every(filter(this.props.quiz.questions, question => question.required),
            question => this.props.quiz.response[question.key]);
    }

    renderQuestion(question: any, qNo: number) {
        switch (question.type) {
            case quizConstants.MULTIPLE_CHOICE:
                return (
                    <MultipleChoiceQuestion
                        question={(question: MultipleChoiceQuestionType)}
                        qNo={qNo}
                        content={this.props.quiz.response[question.key]}
                        onChange={this.handleAnswerChange}
                    />
                );
            case quizConstants.SHORT_ANSWER:
                return (
                    <ShortAnswerQuestion
                        question={(question: ShortAnswerQuestionType)}
                        qNo={qNo}
                        content={this.props.quiz.response[question.key]}
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
                        {this.props.quiz.questions.map((question, idx) => this.renderQuestion(question, idx + 1))}
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

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            answerQuestion
        },
        dispatch);
}

export default connect(null, mapDispatchToProps)(Quiz)
