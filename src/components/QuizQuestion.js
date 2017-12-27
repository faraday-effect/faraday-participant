import React from 'react';

const QuizQuestion = props => {
    return (
        <div className="answer">
            <p>{props.key} {props.answer}</p>
        </div>
    );
};

export default QuizQuestion;