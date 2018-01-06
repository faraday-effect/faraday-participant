import update from 'immutability-helper';

export default function quizzes(state = {}, action) {
    switch (action.type) {
        case 'FETCH_QUIZZES_SUCCEEDED':
            return action.payload.quizzes;
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
