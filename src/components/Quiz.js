import React from 'react';
import QuizQuestion from './QuizQuestion';

const Quiz = props => {
    return (
        <div className="quiz">
            <p className="quiz-title">{}

            <div className="quiz-question">
                {props.content.question}
            </div>
            {props.content.answers.map(answer=> <QuizQuestion key={answer.id} answer={answer.text}/>)}
        </div>
    );
};

export default Quiz;
