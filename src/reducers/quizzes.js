import update from 'immutability-helper';

import { quizConstants } from '../components/Quiz';

const mockQuiz = {
    title: 'The Python Bridge',
    key:     'python-bridge-quiz',
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
            options: [
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

const initialState = {
    [mockQuiz.key]: mockQuiz
};

export default function quizzes(state = initialState, action) {
    switch (action.type) {
        case 'RESPOND_TO_QUIZ':
            console.log('WRITE ME');
            return state;
        case 'ANSWER_QUESTION':
            return update(state, {
                [action.payload.quizKey] : {
                    response: {
                        [action.payload.name]: {$set: action.payload.value}
                    }
                }
            });
        default:
            return state;
    }
}
