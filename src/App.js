import React, { Component } from 'react';
import {quizConstants, Quiz} from './components/Quiz';
import './App.css';

const mockQuiz = {
    title: 'The Python Bridge',
    questions: [
        {
            key: 'your-name',
            type: quizConstants.SHORT_ANSWER,
            required: true,
            prompt: 'What is your name?'
        },
        {
            key: 'your-quest',
            type: quizConstants.MULTIPLE_CHOICE,
            required: true,
            prompt: 'What is your quest?',
            answers: [
                {
                    value: 'grail',
                    text: 'I seek the Holy Grail',
                    correct: true
                },
                {
                    value: 'shrubbery',
                    text: 'I desire a shrubbery',
                    correct: false
                },
                {
                    value: 'groceries',
                    text: 'I seek the grocery store',
                    correct: false
                }
            ]
        },
        {
            key: 'your-favorite-color',
            type: quizConstants.SHORT_ANSWER,
            required: false,
            prompt: 'What is your favorite color?'
        },
    ]
};

class App extends Component {
    handleQuizResponse(response) {
        console.log('QUIZ RESPONSE', response);
    }

    render() {
        return <Quiz quiz={mockQuiz} onResponse={this.handleQuizResponse}/>;
    }
}

export default App;

