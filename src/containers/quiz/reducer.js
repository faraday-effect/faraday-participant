import {quizActionType} from '../actions/quiz';

export default function quizzes(state = [], action) {
    switch (action.type) {
        case quizActionType.FETCH_QUIZZES_SUCCEEDED:
            return action.payload.quizzes;

        case quizActionType.RESPOND_TO_QUIZ:
            console.log('WRITE ME');
            return state;

        case quizActionType.ANSWER_QUESTION:
            return state.map(quiz => {
                if (quiz.key === action.payload.quizKey) {
                    return {
                        ...quiz,
                        response: {
                            ...quiz.response,
                            [action.payload.name]: action.payload.value
                        }
                    }
                } else {
                    return quiz;
                }
            });

        default:
            return state;
    }
}
