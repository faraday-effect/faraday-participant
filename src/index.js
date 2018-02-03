// @flow

import React from 'react'
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';

import createHistory from 'history/createBrowserHistory';
import configureStore from './configureStore';
import App from './scenes/App'

import fontawesome from '@fortawesome/fontawesome';
import solid from '@fortawesome/fontawesome-free-solid';
import SignIn from "./scenes/LogIn";

fontawesome.library.add(solid);

const history = createHistory();
const store = configureStore(history);

const rootElement = document.getElementById('react-root');
if (!rootElement) {
    throw new Error("Can't find root element");
}

ReactDOM.render(
    <Provider store={store}>
        <SignIn/>
    </Provider>,
    rootElement
);
