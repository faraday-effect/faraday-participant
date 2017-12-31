import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import 'semantic-ui-css/semantic.min.css';

import quiz from './reducers';
import App from './App';

const store = createStore(quiz);
console.log("STORE", store);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));

registerServiceWorker();
