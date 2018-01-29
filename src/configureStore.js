
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { reducer as formReducer } from 'redux-form';
import * as reducers from './reducers';

import { connectRoutes } from 'redux-first-router';

import routesMap from './routesMap'

export default history => {
    const {reducer: routeReducer, middleware, enhancer} = connectRoutes(history, routesMap);

    const rootReducer = combineReducers({
        ...reducers,
        form: formReducer,
        location: routeReducer
    });

    const middlewares = applyMiddleware(middleware, thunk);

    const store = createStore(
        rootReducer,
        composeWithDevTools(enhancer, middlewares)
    );

    return store;
}
