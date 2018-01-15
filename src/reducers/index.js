import { combineReducers } from 'redux'
import quizzes from './quizzes';
import { talks, talkViews } from './talks';

export default combineReducers({
    quizzes,
    talks,
    talkViews
});
