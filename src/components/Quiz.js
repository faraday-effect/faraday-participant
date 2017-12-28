import React from 'react';
import { Form, Header, Radio } from 'semantic-ui-react'

const QuizAnswer = ({answer}) => {
    return (
        <Form.Field>
            <Radio
                label={answer.text}
                value={answer.id}
            />
        </Form.Field>
    );
};

const QuizQuestion = ({question}) => {
    return (
        <div className="quiz-question">
            <p>{question.text}</p>
            <Form>
                {question.answers.map(answer => <QuizAnswer key={answer.id} answer={answer}/>)}
            </Form>
        </div>
    );
};

const Quiz = ({quiz}) => {
    return (
        <div className="quiz">
            <Header as="h1">{quiz.title}</Header>
            {quiz.questions.map(question => <QuizQuestion key={question.id} question={question}/>)}
        </div>
    );
};

export default Quiz;
