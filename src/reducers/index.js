import { combineReducers } from 'redux'
import quizzes from './quizzes';
import cells from './cells';
import notes from './notes';

export default combineReducers({
    cells,
    notes,
    quizzes
});
