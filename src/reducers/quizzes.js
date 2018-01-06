export default function quizzes(state = [], action) {
    switch (action.type) {
        case 'FETCH_QUIZZES_SUCCEEDED':
            return action.payload.quizzes;
        case 'RESPOND_TO_QUIZ':
            console.log('WRITE ME');
            return state;
        case 'ANSWER_QUESTION':
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
