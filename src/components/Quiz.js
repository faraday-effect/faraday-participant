import React, { Component } from 'react';
import { Button, Form, Header, Input, Label, Radio, Segment } from 'semantic-ui-react';
import { every, filter, fromPairs } from 'lodash';
import PropTypes from 'prop-types';

export const quizConstants = {
    SHORT_ANSWER: 'SHORT_ANSWER',
    MULTIPLE_CHOICE: 'MULTIPLE_CHOICE'
};

const QuestionPrompt = ({question, qNo}) => {
    return (
        <Label color="teal">
            {`${qNo}. ${question.prompt}`}
            {question.required && <Label.Detail>Required</Label.Detail>}
        </Label>
    );
};

export class Quiz extends Component {
    static propTypes = {
        quiz: PropTypes.object.isRequired,
        onResponse: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            response: fromPairs(props.quiz.questions.map(question => [question.key, '']))
        };
    }

    handleAnswerChange = (event, data) => {
        this.setState({response: {...this.state.response, [data.name]: data.value}});
    };

    handleResponse = (event, data) => {
        this.props.onResponse(this.state.response);
    };

    haveRequiredAnswers() {
        return every(filter(this.props.quiz.questions, question => question.required),
            question => this.state.response[question.key]);
    }

    renderShortAnswerQuestion(question, qNo) {
        return (
            <Form.Field key={question.key}>
                <QuestionPrompt question={question} qNo={qNo}/>
                <Input
                    name={question.key}
                    value={this.state.response[question.key]}
                    onChange={this.handleAnswerChange}/>
            </Form.Field>
        );
    };

    renderMultipleChoiceQuestion(question, qNo) {
        return (
            <Form.Group grouped key={question.key}>
                <QuestionPrompt question={question} qNo={qNo}/>
                {question.options.map(option => (
                    <Form.Field key={option.value}>
                        <Radio
                            label={option.text}
                            name={question.key}
                            value={option.value}
                            checked={this.state.response[question.key] === option.value}
                            onChange={this.handleAnswerChange}/>
                    </Form.Field>
                ))}
            </Form.Group>
        );
    };

    renderQuestion(question, qNo) {
        switch (question.type) {
            case quizConstants.MULTIPLE_CHOICE:
                return this.renderMultipleChoiceQuestion(question, qNo);
            case quizConstants.SHORT_ANSWER:
                return this.renderShortAnswerQuestion(question, qNo);
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
                            onClick={this.handleResponse}>Submit</Button>
                    </Form>
                </div>
            </Segment>
        );
    }
}
