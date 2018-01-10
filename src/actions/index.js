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

export function fetchCellsSucceeded(cells) {
    return {
        type: 'FETCH_CELLS_SUCCEEDED',
        payload: {
            cells
        }
    }
}

export function fetchCells() {
    return dispatch => {
        request('http://localhost:8000/api/cells')
            .then(response => dispatch(fetchCellsSucceeded(JSON.parse(response))))
            .catch(err => console.error(err));
    };
}

export function fetchNotesSucceeded(notes) {
    return {
        type: 'FETCH_NOTES_SUCCEEDED',
        payload: {
            notes
        }
    }
}

export function fetchNotes() {
    return dispatch => {
        request('http://localhost:8000/api/notes')
            .then(response => dispatch(fetchNotesSucceeded(JSON.parse(response))))
            .catch(err => console.error(err));
    };
}
