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
            .then(response => dispatch(fetchQuizzesSucceeded(JSON.parse(response))))
            .catch(err => console.error(err));
    };
}

export function fetchTalksSucceeded(talks) {
    return {
        type: 'FETCH_TALKS_SUCCEEDED',
        payload: {
            talks
        }
    }
}

export function fetchTalks(destination = 'podium') {
    return dispatch => {
        request({
            url: `http://localhost:8000/api/talks`,
            qs: { destination: destination}
        })
            .then(response => dispatch(fetchTalksSucceeded(JSON.parse(response))))
            .catch(err => console.error(err));
    };
}
