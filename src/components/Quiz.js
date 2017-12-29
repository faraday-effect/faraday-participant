import React, { Component } from 'react';
import { Button, Form, Header, Radio } from 'semantic-ui-react';
import { fromPairs } from 'lodash';

export const quizConstants = {
    SHORT_ANSWER: 'SHORT_ANSWER',
    MULTIPLE_CHOICE: 'MULTIPLE_CHOICE'
};

export class Quiz extends Component {
    constructor(props) {
        super(props);

        // this.state = {
        //     "your-name": '',
        //     "your-quest": '',
        //     "your-favorite-color": ''
        // };

        this.state = fromPairs(props.quiz.questions.map(question => [question.key, '']));
    }

    handleShortAnswerChange = (event, data) => {
        this.setState({[data.name]: data.value});
    };

    handleMultipleChoiceChange = (event, data) => {
        this.setState({[data.name]: data.value});
    };

    handleSubmit = () => {
        console.log(this.state);
    };

    renderShortAnswerQuestion = question => {
        return (
            <div className="quiz-question-short-answer" key={question.key}>
                <p>{question.prompt}</p>
                <Form>
                    <Form.Input
                        name={question.key}
                        value={this.state[question.key]}
                        onChange={this.handleShortAnswerChange}
                    />
                </Form>
            </div>
        );
    };

    renderMultipleChoiceQuestion = question => {
        return (
            <div className="quiz-question-multiple-choice" key={question.key}>
                <p>{question.prompt}</p>
                <Form>
                    {question.answers.map(answer => (
                        <Form.Field key={answer.value}>
                            <Radio
                                label={answer.text}
                                name={question.key}
                                value={answer.value}
                                checked={this.state[question.key] === answer.value}
                                onChange={this.handleMultipleChoiceChange}
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
