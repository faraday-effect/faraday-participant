import React from 'react';
import { List, Header } from 'semantic-ui-react'

const QuizAnswer = ({answer}) => {
    return (
        <List.Item>
            {answer.text}
        </List.Item>
    );
};

const QuizQuestion = ({question}) => {
    return (
        <div className="quiz-question">
            <p>{question.text}</p>
            <List bulleted>
                {question.answers.map(answer => <QuizAnswer key={answer.id} answer={answer}/>)}
            </List>
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
