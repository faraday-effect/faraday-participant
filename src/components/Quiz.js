import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Header, Input, Label, Radio, Segment } from 'semantic-ui-react';
import { every, filter, fromPairs } from 'lodash';
import PropTypes from 'prop-types';

import { answerQuestion } from "../actions";

export const quizConstants = {
    SHORT_ANSWER: 'SHORT_ANSWER',
    MULTIPLE_CHOICE: 'MULTIPLE_CHOICE'
};

const QuestionPrompt = props => {
    return (
        <Label color="teal">
            {props.qNo}
            {props.question.prompt}
            {props.question.required && <Label.Detail>Required</Label.Detail>}
        </Label>
    );
};
QuestionPrompt.propTypes = {
    question: PropTypes.object.isRequired,
    qNo: PropTypes.number.isRequired
};

const ShortAnswerQuestion = props => (
    <Form.Field key={props.question.key}>
        <QuestionPrompt question={props.question} qNo={props.qNo}/>
        <Input
            name={props.question.key}
            value={props.content}
            onChange={props.onChange}/>
    </Form.Field>
);
ShortAnswerQuestion.propTypes = {
    question: PropTypes.object.isRequired,
    qNo: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

const MultipleChoiceQuestion = props => (
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
MultipleChoiceQuestion.propTypes = {
    question: PropTypes.object.isRequired,
    qNo: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

class Quiz extends Component {
    static propTypes = {
        quiz: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        props.quiz.response = fromPairs(props.quiz.questions.map(question => [question.key, '']));
    }

    handleAnswerChange = (event, data) => {
        console.log(this, data.name, data.value);
        this.props.dispatch(answerQuestion(this.props.quiz.key, data.name, data.value));
    };

    handleSubmit = (event, data) => {
        console.log("SUBMIT");
    };

    haveRequiredAnswers() {
        return every(filter(this.props.quiz.questions, question => question.required),
            question => this.props.quiz.response[question.key]);
    }

    renderQuestion(question, qNo) {
        switch (question.type) {
            case quizConstants.MULTIPLE_CHOICE:
                return (
                    <MultipleChoiceQuestion
                        key={question.key}
                        question={question}
                        qNo={qNo}
                        content={this.props.quiz.response[question.key]}
                        onChange={this.handleAnswerChange}
                    />
                );
            case quizConstants.SHORT_ANSWER:
                return (
                    <ShortAnswerQuestion
                        key={question.key}
                        question={question}
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

export default connect()(Quiz)
