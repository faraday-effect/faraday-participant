import request from 'request-promise';
import apiUrl from './common';

export const quizActionType = {
    ANSWER_QUESTION: 'ANSWER_QUESTION',
    FETCH_QUIZ_SUCCEEDED: 'FETCH_QUIZ_SUCCEEDED',
    FETCH_QUIZZES_SUCCEEDED: 'FETCH_QUIZZES_SUCCEEDED',
    RESPOND_TO_QUIZ: 'RESPOND_TO_QUIZ'
};

type ShortAnswerQuestionType = {
    type: "short-answer",
    uid: string,
    required: boolean,
    prompt: string
};

type MultipleChoiceOptionType = {
    value: string,
    text: string,
    correct: boolean
};

type MultipleChoiceQuestionType = {
    type: "multiple-choice",
    uid: string,
    required: boolean,
    prompt: string,
    options: Array<MultipleChoiceOptionType>
};

export type QuizType = {
    _id: string,
    uid: string,
    title: string,
    questions: Array<MultipleChoiceQuestionType | ShortAnswerQuestionType>
};

function fetchQuizSucceeded(quiz: QuizType) {
    return {
        type: quizActionType.FETCH_QUIZ_SUCCEEDED,
        payload: quiz
    };
}

export function fetchQuiz(uid: string) {
    return (dispatch: $FlowTODO) => {
        request({
            url: apiUrl('quizzes', uid),
            json: true
        }).then(response => dispatch(fetchQuizSucceeded(response)));
    };
}

///////////////

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
