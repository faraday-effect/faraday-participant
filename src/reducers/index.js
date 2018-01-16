import { combineReducers } from 'redux'

import quizzes from './quizzes';
import topics from './topics';

export default combineReducers({
    quizzes,
    topics
});
