// @flow

import {applyMiddleware, combineReducers, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { reducer as formReducer } from 'redux-form';
import sceneReducer from './reducers/scenes';
import * as reducers from './reducers';

import { connectRoutes } from 'redux-first-router';

import routesMap from './routesMap'
import logger from 'redux-logger';

import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

function configureStore(history: History) {
    const {reducer: routeReducer, middleware: routeMiddleware, enhancer} = connectRoutes(history, routesMap);

    const rootReducer = combineReducers({
        ...reducers,
        scene: sceneReducer,
        form: formReducer,
        location: routeReducer
    });

    const sagaMiddleware = createSagaMiddleware();

    const middlewares = applyMiddleware(routeMiddleware, sagaMiddleware, thunk, logger);

    const store = createStore(
        rootReducer,
        composeWithDevTools(enhancer, middlewares)
    );

    sagaMiddleware.run(rootSaga);

    return store;
}

export default configureStore;

