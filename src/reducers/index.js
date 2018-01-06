import { combineReducers } from 'redux'
import quizzes from './quizzes';
import cells from './cells';

export default combineReducers({
    cells,
    quizzes
});
