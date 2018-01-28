// @flow

import type {Action} from '../types/redux';

export const HOME_PAGE = 'ROUTE/HOME-PAGE';
export const SIGN_UP_PAGE = 'ROUTE/SIGN-UP-PAGE';
export const TOPICS_PAGE = 'ROUTE/TOPICS-PAGE';
export const QUIZZES_PAGE = 'ROUTE/QUIZZES-PAGE';

export default (state: $FlowTODO = null, action: Action) => {
    switch(action.type) {
        case HOME_PAGE:
            return 'HomePage';
        case SIGN_UP_PAGE:
            return 'SignupPage';
        case TOPICS_PAGE:
            return 'TopicsPage';
        case QUIZZES_PAGE:
            return 'QuizzesPage';
        default:
            return state;
    }
}
