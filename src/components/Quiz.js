import React, { Component } from 'react';
import { Button, Form, Header, Radio } from 'semantic-ui-react';
import { fromPairs } from 'lodash';

export const quizConstants = {
    SHORT_ANSWER: 'SHORT_ANSWER',
    MULTIPLE_CHOICE: 'MULTIPLE_CHOICE'
};

const QuestionPrompt = props => {
    return (
        <p>
            {props.prompt}
            {props.required && <span> (Required)</span>}
        </p>
    );
}

export class Quiz extends Component {
    constructor(props) {
        super(props);

        this.state = {
            question: fromPairs(props.quiz.questions.map(question => [question.key, ''])),
            haveAllRequired: false
        };
    }

    handleAnswerChange = (event, data) => {
        this.setState({ question: { ...this.state.question, [data.name]: data.value}});
    };

    handleSubmit = () => {
        this.props.quiz.questions.forEach(question => {
            console.log(question.required, this.state[question.key]);
        });
        console.log(this.state);
    };

    haveRequiredAnswers = () => {
        console.log('Foo');
    };

    renderShortAnswerQuestion = question => {
        return (
            <div className="quiz-question-short-answer" key={question.key}>
                <QuestionPrompt prompt={question.prompt} required={question.required}/>
                <Form>
                    <Form.Input
                        name={question.key}
                        value={this.state.question[question.key]}
                        onChange={this.handleAnswerChange}
                    />
                </Form>
            </div>
        );
    };

    renderMultipleChoiceQuestion = question => {
        return (
            <div className="quiz-question-multiple-choice" key={question.key}>
                <QuestionPrompt prompt={question.prompt} required={question.required}/>
                <Form>
                    {question.answers.map(answer => (
                        <Form.Field key={answer.value}>
                            <Radio
                                label={answer.text}
                                name={question.key}
                                value={answer.value}
                                checked={this.state.question[question.key] === answer.value}
                                onChange={this.handleAnswerChange}
                            />
                        </Form.Field>
                    ))}
                </Form>
            </div>
        );
    };

    renderQuestion = (question) => {
        switch (question.type) {
            case quizConstants.MULTIPLE_CHOICE:
                return this.renderMultipleChoiceQuestion(question);
            case quizConstants.SHORT_ANSWER:
                return this.renderShortAnswerQuestion(question);
            default:
                return <p>INVALID QUESTION TYPE</p>;
        }
    };

    render() {
        return (
            <div className="quiz">
                <Header as="h1">{this.props.quiz.title}</Header>
                {this.props.quiz.questions.map(question => this.renderQuestion(question))}
                <Button primary onClick={this.handleSubmit}>Submit</Button>
            </div>
        );
    }
}
