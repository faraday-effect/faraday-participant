import React, { Component } from 'react';
import Quiz from './components/Quiz';
import './App.css';

const mockQuiz = {
    title: 'The Bridge',
    questions: [
        {
            id: 1,
            text: 'What is your quest?',
            answers: [
                {
                    id: 1,
                    text: 'I seek the Holy Grail',
                    correct: true
                },
                {
                    id: 2,
                    text: 'I desire a shrubbery',
                    correct: false
                },
                {
                    id: 3,
                    text: 'I seek the grocery store',
                    correct: false
                }
            ]
        }
    ]
};

class App extends Component {
    render() {
        return (
            <div className="main-content">
                <Quiz quiz={mockQuiz}/>
            </div>
        );
    }
}

export default App;