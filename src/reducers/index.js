import { combineReducers } from 'redux'
import quizzes from './quizzes';
import cells from './cells';

const rootReducer = combineReducers({
    cells,
    quizzes
});

export default rootReducer;
