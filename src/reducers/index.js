// @flow

import { combineReducers } from 'redux'
import topicsReducer from './topics';
import quizzesReducer from './quizzes';

export default combineReducers({
    topics: topicsReducer,
    quizzes: quizzesReducer
});
