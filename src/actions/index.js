import request from 'request-promise';

export function respondToQuiz(response) {
    return {
        type: 'RESPOND_TO_QUIZ',
        payload: response
    }
}

export function answerQuestion(quizKey, name, value) {
    return {
        type: 'ANSWER_QUESTION',
        payload: {
            quizKey,
            name,
            value
        }
    };
}

export function fetchQuizzesSucceeded(quizzes) {
    return {
        type: 'FETCH_QUIZZES_SUCCEEDED',
        payload: {
            quizzes
        }
    }
}

export function fetchQuizzes() {
    return dispatch => {
        request('http://localhost:8000/api/quizzes')
            .then(response => dispatch(fetchQuizzesSucceeded(response)))
            .catch(err => console.error(err));
    };
}