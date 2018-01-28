
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { reducer as formReducer } from 'redux-form'
import topicsReducer from './reducers/topics';
import quizzesReducer from './reducers/quizzes';
import pageReducer from './reducers/page';

import { connectRoutes } from 'redux-first-router';

import routesMap from './routesMap'

export default history => {
    const {reducer, middleware, enhancer} = connectRoutes(history, routesMap);

    const rootReducer = combineReducers({
        page: pageReducer,
        topics: topicsReducer,
        quizzes: quizzesReducer,
        form: formReducer,
        location: reducer
    });

    const middlewares = applyMiddleware(middleware, thunk);

    const store = createStore(
        rootReducer,
        composeWithDevTools(enhancer, middlewares)
    );

    return store;
}
