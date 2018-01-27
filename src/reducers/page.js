// @flow

import {HOME, SIGN_UP, TOPICS, QUIZZES} from '../routesMap';

export default (state = null, action) => {
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
