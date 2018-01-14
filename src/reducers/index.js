import { combineReducers } from 'redux'
import quizzes from './quizzes';
import cells from './cells';
import talks from './talks';

export default combineReducers({
    cells,
    talks,
    quizzes
});
