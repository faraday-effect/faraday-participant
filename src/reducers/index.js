import { quizConstants } from '../components/Quiz';

const mockQuiz = {
    title: 'The Python Bridge',
    key: 'python-bridge-quiz',
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
    ],
    responses: {}
};

export default function quiz(state = { quiz: mockQuiz }, action) {
    switch (action.type) {
        case 'RESPOND_TO_QUIZ':
            return {
                ...state,
                response: action.payload
            };
        default:
            return state;
    }
}
