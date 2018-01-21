// @flow

import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import topicsReducer from './topics';
import quizzesReducer from './quizzes';

export default combineReducers({
    topics: topicsReducer,
    quizzes: quizzesReducer,
    form: formReducer
});
