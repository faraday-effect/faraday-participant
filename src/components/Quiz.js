import React, { Component } from 'react';
import { Button, Form, Header, Radio } from 'semantic-ui-react';

export default class Quiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answer: null
        };
    }

    onAnswerChange = (event, data) => {
        this.setState({answer: data.value});
    };

    onSubmit = () => {
        console.log(`Submit: ${JSON.stringify(this.state)}`);
    };

    render() {
        return (
            <div className="quiz">
                <Header as="h1">{this.props.quiz.title}</Header>
                {this.props.quiz.questions.map(question => (
                    <div className="quiz-question" key={question.id}>
                        <p>{question.text}</p>
                        <Form>
                            {question.answers.map(answer => (
                                <Form.Field key={answer.id}>
                                    <Radio
                                        label={answer.text}
                                        value={answer.id}
                                        checked={this.state.answer === answer.id}
                                        onChange={this.onAnswerChange}
                                    />
                                </Form.Field>
                            ))}
                        </Form>
                    </div>
                ))}
                <Button
                    primary
                    onClick={this.onSubmit}
                >Submit</Button>
            </div>
        );
    }
}
