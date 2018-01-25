import React from 'react'
import ReactDOM from 'react-dom';

import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import fontawesome from '@fortawesome/fontawesome';
import solid from '@fortawesome/fontawesome-free-solid';

import rootReducer from './reducers';

import App from './containers/App'

fontawesome.library.add(solid);

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
