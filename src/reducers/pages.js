// @flow

import type {Action} from '../types/redux';

export const PROJECTOR_PAGE = 'ROUTE/PROJECTOR-PAGE';
export const QUIZZES_PAGE = 'ROUTE/QUIZZES-PAGE';
export const SIGN_UP_PAGE = 'ROUTE/SIGN-UP-PAGE';
export const TOPICS_PAGE = 'ROUTE/TOPICS-PAGE';

export default (state: $FlowTODO = null, action: Action) => {
    switch(action.type) {
        case PROJECTOR_PAGE:
            return 'ProjectorPage';
        case QUIZZES_PAGE:
            return 'QuizzesPage';
        case SIGN_UP_PAGE:
            return 'SignupPage';
        case TOPICS_PAGE:
            return 'TopicsPage';
        default:
            return state;
    }
}
