// @flow

import request from 'request-promise';
import {apiUrl} from '../../reducers/common';
import type {QuizType} from './components/Quiz';

// Actions
const ANSWER_QUESTION = 'QUIZZES/ANSWER_QUESTION';
const FETCH_ALL_OKAY = 'QUIZZES/FETCH_ALL_OKAY';
const FETCH_ONE_OKAY = 'QUIZZES/FETCH_ONE_OKAY';
const RESPOND_TO_ONE = 'QUIZZES/RESPOND_TO_ONE';

// State
type State = { [string]: QuizType };
const initialState: State = {};

// Reducer
export default function quizzes(state: State = initialState, action: any) {     // FIXME
    switch (action.type) {
        case FETCH_ALL_OKAY:
            const allQuizzes = {};
            (action.payload: Array<QuizType>).forEach(quiz => allQuizzes[quiz._id] = quiz);
            return allQuizzes;

        case RESPOND_TO_ONE:
            throw new Error('IMPLEMENT ME');

        case ANSWER_QUESTION:
            throw new Error('IMPLEMENT ME');

        default:
            return state;
    }
}

// Action creators
function fetchOneOkay(quiz: QuizType) {
    return { type: FETCH_ONE_OKAY, payload: quiz };
}

function fetchAllOkay(quizzes: Array<QuizType>) {
    return { type: FETCH_ALL_OKAY, payload: quizzes };
}

// Side effects
export function fetchOne(_id: string) {
    return (dispatch: $FlowTODO) => {
        request({
            url: apiUrl('quizzes', _id),
            json: true
        }).then(response => dispatch(fetchOneOkay(response)));
    };
}

export function fetchAll() {
    return (dispatch: $FlowTODO) => {
        request(apiUrl('quizzes'))
            .then(response => dispatch(fetchAllOkay(JSON.parse(response))))
            .catch(err => console.error(err));
    };
}
