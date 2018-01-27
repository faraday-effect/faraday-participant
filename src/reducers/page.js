// @flow

import {HOME, SIGN_UP, TOPICS, QUIZZES} from '../routesMap';

import type {Action} from '../types/redux';

export default (state: $FlowTODO = null, action: Action) => {
    switch(action.type) {
        case HOME:
            return 'HomePage';
        case SIGN_UP:
            return 'SignupPage';
        case TOPICS:
            return 'TopicsPage';
        case QUIZZES:
            return 'QuizzesPage';
        default:
            return state;
    }
}
