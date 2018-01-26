import React from 'react'
import ReactDOM from 'react-dom';

import {applyMiddleware, combineReducers, createStore} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import { reducer as formReducer } from 'redux-form'
import topicsReducer from './reducers/topics';
import quizzesReducer from './reducers/quizzes';

import createHistory from 'history/createBrowserHistory';

import { connectRoutes } from 'redux-first-router';

import {composeWithDevTools} from 'redux-devtools-extension';

import fontawesome from '@fortawesome/fontawesome';
import solid from '@fortawesome/fontawesome-free-solid';

import App from './containers/App'

fontawesome.library.add(solid);

const history = createHistory();

const routesMap = {
    HOME: '/',
    SIGN_UP: '/sign-up',
    TOPICS: '/topics/:topicId?',
    QUIZZES: '/quizzes'
};

const { reducer, middleware, enhancer } = connectRoutes(history, routesMap);

const rootReducer = combineReducers({
    location: reducer,
    topics: topicsReducer,
    quizzes: quizzesReducer,
    form: formReducer
});

const middlewares = applyMiddleware(middleware, thunk);


const store = createStore(
    rootReducer,
    composeWithDevTools(enhancer, middlewares)
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('react-root')
);
