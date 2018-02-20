// @flow

import type {QuizType} from './components/Quiz';
import {httpGetAuth} from "../../lib/api";

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
    return async (dispatch: $FlowTODO) => {
        const response = await dispatch(httpGetAuth('quizzes'));
        dispatch(fetchOneOkay(response.payload));
    };
}

export function fetchAll() {
    return async (dispatch: $FlowTODO) => {
        try {
            const response = await dispatch(httpGetAuth('quizzes'));
            dispatch(fetchAllOkay(response.payload));
        } catch(err) {
            console.error(err);
        }
    };
}
