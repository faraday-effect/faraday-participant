import { combineReducers } from 'redux'
import quizzes from './quizzes';
import talks from './talks';

export default combineReducers({
    talks,
    quizzes
});
