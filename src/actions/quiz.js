import request from 'request-promise';
import apiUrl from './common';

export const quizActionType = {
    ANSWER_QUESTION: 'ANSWER_QUESTION',
    RESPOND_TO_QUIZ: 'RESPOND_TO_QUIZ',
    FETCH_QUIZZES_SUCCEEDED: 'FETCH_QUIZZES_SUCCEEDED'
};

export function respondToQuiz(response) {
    return {
        type: quizActionType.RESPOND_TO_QUIZ,
        payload: response
    }
}

export function answerQuestion(quizKey, name, value) {
    return {
        type: quizActionType.ANSWER_QUESTION,
        payload: {
            quizKey,
            name,
            value
        }
    };
}

export function fetchQuizzesSucceeded(quizzes) {
    return {
        type: quizActionType.FETCH_QUIZZES_SUCCEEDED,
        payload: {
            quizzes
        }
    }
}

export function fetchQuizzes() {
    return dispatch => {
        request(apiUrl('quizzes'))
            .then(response => dispatch(fetchQuizzesSucceeded(JSON.parse(response))))
            .catch(err => console.error(err));
    };
}
